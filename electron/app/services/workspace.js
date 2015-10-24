import fs from 'fs';
import path from 'path';
import EPub from 'epub';
import Q from 'Q';
import co from 'co';

export default {

    getFiles (dir) {
        return fs.readdirSync(dir) || [];
    },

    getEpubs (dir) {
        return this.getFiles(dir).filter(function(name){
            return name.match(/\.epub$/);
        });
    },

    readEpub (dir, name) {
        let deferred = Q.defer();
        let epub = new EPub(dir + path.sep + name, 'imagewebroot', 'chapterwebroot');
        epub.on('end', function(){
            deferred.resolve(epub.metadata);
        });
        epub.parse();
        return deferred.promise;
    },

    readEpubSync (dir, name) {
        let self = this;
        let metadata = Q.async(function*() {
            let a = yield( self._readEpub(dir, name) );
            return a;
        })().done();

        let meta;
        self._readEpub(dir, name).then(function*(metadata){
            yield(metadata)
            meta = metadata;
        });

        let yo = co(function* () {
            let a = yield( self._readEpub(dir, name) );
                console.log('aaaaaaaaaaaaaaaaaa');
                console.log(a);
                console.log('aaaaaaaaaaaaaaaaaa');
            return a;
        });
        yo.a='a';
        return yo;
    }

}
