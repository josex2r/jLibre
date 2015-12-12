import fs from 'fs';
import path from 'path';
import Q from 'Q';
import request from 'request';
import querystring from 'querystring';
import mkdirp  from 'mkdirp';

export default {

    workspacePath: '',

    coversPath: '',

    coversExt: 'jpg',

    setWorkspace (workspacePath) {
        this.workspacePath = workspacePath;
        this.coversPath = `${this.workspacePath}.jLibre/`;
        mkdirp(this.coversPath);
    },

    getCoverName (title, author) {
        return `${title}_${author}`.replace(/[^a-z0-9]/gi, '_');
    },

    getCover (title, author) {
        const coverName = this.getCoverName(title, author);
        const imagePath = `${this.coversPath}${coverName}.${this.coversExt}`;

        if(fs.existsSync(imagePath)){
            return imagePath;
        }
        return;
    },

    saveCover (title, author, buffer) {
        let deferred = Q.defer();
        const coverName = this.getCoverName(title, author);
        const imagePath = `${this.coversPath}${coverName}.${this.coversExt}`;

        fs.writeFile(imagePath, buffer, 'binary', function(err) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(imagePath);
            }
        });

        return deferred.promise;
    }

}
