import fs from 'fs';
import path from 'path';
import EPub from 'epub';
import Q from 'Q';
import co from 'co';
import request from 'request';
import querystring from 'querystring';
import mkdirp  from 'mkdirp';
import metadataSrv  from './metadata';

export default {

    workspacePath: '',

    setWorkspace (workspacePath) {
        this.workspacePath = workspacePath;
    },

    getFiles (dir) {
        return fs.readdirSync(`${this.workspacePath}${dir}`) || [];
    },

    isDirectory (dir) {
        const stat = fs.statSync(`${this.workspacePath}${dir}`);
        return stat && stat.isDirectory();
    },

    _getFilesRecursively (dir, depth) {
        let results = [];
        let list = this.getFiles(dir);
        if(depth){
            list.forEach(function(file) {
                const fileName = `${dir}${file}`;
                const fileDir = `${fileName}${path.sep}`;
                if(this.isDirectory(fileDir)){
                    results = results.concat(
                        this._getFilesRecursively(fileDir, depth - 1)
                    );
                }else{
                    results.push(fileName);
                }
            }.bind(this));
        }
        return results;
    },

    getEpubs (depth = 5) {
        return this._getFilesRecursively('', depth).filter(function(name){
            return name.match(/\.epub$/);
        });
    },

    readEpub (dir, name) {
        let self = this;
        let deferred = Q.defer();
        const file = `${dir}${path.sep}${name}`;
        const metadata = metadataSrv.findByFile(file);

        if (metadata) {
            deferred.resolve(metadata);
        } else {
            let epub = new EPub(file, 'Images', 'Text');
            epub.on('end', function(){
                epub.metadata.file = file;
                metadataSrv.add(epub.metadata);
                deferred.resolve(epub.metadata);
            });
            epub.parse();
        }

        return deferred.promise;
    }

}
