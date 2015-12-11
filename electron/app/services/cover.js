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
        let deferred = Q.defer();

        if(fs.existsSync(imagePath)){
            // Get file from dir
            deferred.resolve(imagePath);
        }else{
            // Get file from googleapis
            this.searchCover(title, author).then(function(data){
                try{
                    // Parse response
                    const result = JSON.parse(data);
                    const url = result.responseData.results[0].url;
                    // Download image
                    request.get({url: url, encoding: 'binary'}, function (err, response, body) {
                        // Write image file
                        fs.writeFile(imagePath, body, 'binary', function(err) {});
                    });
                    // Resolve with the image url while writing the file
                    deferred.resolve(url);
                }catch(e){
                    deferred.resolve(e);
                }
            });
        }

        return deferred.promise;
    },

    searchCover (title, author) {
        let encodedQuery = querystring.stringify({
            v: '1.0',
            q: `casa del libro ${title} ${author}`
        });
        let deferred = Q.defer();
        request(`https://ajax.googleapis.com/ajax/services/search/images?${encodedQuery}`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                deferred.resolve(body);
            }else{
                deferred.reject(error);
            }
        });
        return deferred.promise;
    }

}
