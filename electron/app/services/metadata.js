import fs from 'fs';
import path from 'path';
import EPub from 'epub';
import Q from 'Q';
import co from 'co';
import request from 'request';
import querystring from 'querystring';
import mkdirp  from 'mkdirp';
import epubSrv  from './epub';

export default {

    workspacePath: '',

    file: '.metadata',

    epubMetadata: [],

    setWorkspace (workspacePath) {
        this.workspacePath = workspacePath;
        this.load();
    },

    findByFile (file) {
        return this.epubMetadata.find(function(metadata){
            return metadata.file === file;
        });
    },

    add (metadata) {
        const found = this.findByFile(metadata.file);

        if(!found){
            this.epubMetadata.push(metadata);
        }
    },

    load () {
        try {
            const stat = fs.statSync(`${this.workspacePath}${this.file}`);
            if(!stat || (stat && !stat.isFile())){
                this.dump();
            }
        }catch (e) {
            this.dump();
        }

        const json = fs.readFileSync(`${this.workspacePath}${this.file}`, 'utf8');

        try {
            const epubMetadata = JSON.parse(json);

            if(!epubMetadata.length){
                throw 'Malformed file';
            }

            epubMetadata.forEach(function(metadata){
                this.add(metadata);
            }.bind(this));
        } catch (e) {
            this.epubMetadata = [];
        }
    },

    dump () {
        let deferred = Q.defer();
        const json = JSON.stringify(this.epubMetadata);

        fs.writeFile(`${this.workspacePath}${this.file}`, json, 'utf8', function (err) {
          if(err) {
              deferred.reject(err);
          }else{
              deferred.resolve();
          }
        });

        return deferred.promise;
    },

}
