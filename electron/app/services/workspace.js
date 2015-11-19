import fs from 'fs';
import path from 'path';
import EPub from 'epub';
import Q from 'Q';
import co from 'co';
import request from 'request';
import querystring from 'querystring';
import mkdirp  from 'mkdirp';

export default {

    workspacePath: '',

    coversPath: `.covers${path.sep}`,

    setWorkspace (dir) {
        this.workspacePath = `${dir}${path.sep}`;
        this.coversPath = `${this.workspacePath}.covers${path.sep}`;
        mkdirp(this.coversPath);
    },

    getFiles (dir) {
        return fs.readdirSync(`${this.workspacePath}${dir}`) || [];
    },

    isDirectory (dir) {
        const stat = fs.statSync(`${this.workspacePath}${dir}`);
        return stat && stat.isDirectory();
    },

    getFilesRecursively (dir, depth) {
        let results = [];
        let list = this.getFiles(dir);
        if(depth){
            list.forEach(function(file) {
                const fileName = `${dir}${file}`;
                const fileDir = `${fileName}${path.sep}`;
                if(this.isDirectory(fileDir)){
                    results = results.concat(
                        this.getFilesRecursively(fileDir, depth - 1)
                    );
                }else{
                    results.push(fileName);
                }
            }.bind(this));
        }
        return results;
    },

    getEpubs (depth = 5) {
        return this.getFilesRecursively('', depth).filter(function(name){
            return name.match(/\.epub$/);
        });
    },

    readEpub (dir, name) {
        let self = this;
        let deferred = Q.defer();
        let epub = new EPub(`${dir}${path.sep}${name}`, 'Images', 'Text');
        epub.on('end', function(){
            deferred.resolve(epub.metadata);
        });
        epub.parse();
        return deferred.promise;
    },

    getCoverName (title, author) {
        return querystring.stringify({
            q: `${title} ${author}`
        }).replace(/q=/, '');;
    },

    getCover (title, author) {
        const coverName = this.getCoverName(title, author);
        const imagePath = `${this.coversPath}${coverName}`;
        let deferred = Q.defer();

        if(fs.existsSync(imagePath)){
            // Get file from dir
            const contents = fs.readFileSync(imagePath);
            const base64Image = new Buffer(contents, 'binary').toString('base64');
            deferred.resolve(`data:image/png;base64,${base64Image}`);
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
