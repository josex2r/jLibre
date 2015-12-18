import fs from 'fs';
import path from 'path';
import EPub from 'epub';
import Q from 'Q';
import workspaceSrv  from './workspace';
import metadataSrv  from './metadata';
import coverSrv  from './cover';
import epubs from '../epubs/formats';

var formats = epubs.map(function(format){
    return format.type;
});

export default {

    workspacePath: '',

    setWorkspace (workspacePath) {
        this.workspacePath = workspacePath;
    },

    getFiles (dir) {
        return fs.readdirSync(`${this.workspacePath}${dir}`) || [];
    },

    _getFilesRecursively (dir, depth) {
        let results = [];
        let list = this.getFiles(dir);
        if(depth){
            list.forEach(function(file) {
                const fileName = `${dir}${file}`;
                const fileDir = `${fileName}/`;
                if(workspaceSrv.isDirectory(`${this.workspacePath}${fileDir}`)){
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
            name = name.toLowerCase();
            return formats.some(ext => name.match(new RegExp(ext, 'gi')));
        });
    },

    readEpub (dir, name) {
        let self = this;
        let deferred = Q.defer();
        const file = `${dir}${name}`;
        const metadata = metadataSrv.findByFile(file);

        if (metadata) {
            deferred.resolve(metadata);
        } else {
            let epub = new EPub(file, 'Images', 'Text');
            epub.on('end', function(){
                // Set metadata
                const cover = epub.metadata.cover;
                epub.metadata.coverPath = epub.manifest[cover].href;
                epub.metadata.author = epub.metadata.creator;
                epub.metadata.file = file;
                epub.metadata.toc = epub.toc;
                // Check if cover exist
                const coverPath = coverSrv.getCover(epub.metadata.title, epub.metadata.creator);
                if(coverPath){
                    metadataSrv.add(epub.metadata);
                    epub.metadata.cover = coverPath;
                    deferred.resolve(epub.metadata);
                }else{
                    // Read cover from the EPUB file
                    epub.getImage(epub.metadata.cover, function(err, img, mimeType){
                        if(err){
                            deferred.resolve(epub.metadata);
                        }else{
                            coverSrv.saveCover(epub.metadata.title, epub.metadata.creator, img).then(function(path){
                                epub.metadata.cover = path;
                                metadataSrv.add(epub.metadata);
                            }).finally(function(){
                                deferred.resolve(epub.metadata);
                            });
                        }
                    });
                }
            });

            epub.on('error', function(err){
                deferred.reject(err);
            });

            epub.parse();
        }

        return deferred.promise;
    }

}
