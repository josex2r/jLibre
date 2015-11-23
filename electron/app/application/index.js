import ipcSrv from '../services/ipc';
import workspaceSrv from '../services/workspace';
import epubSrv  from '../services/epub';
import coverSrv  from '../services/cover';
import metadataSrv  from '../services/metadata';
import Q from 'Q';

export default class ApplicationIndex {

    constructor (window) {
        this.window = window;
        ipcSrv.init();
        this._suscribe();
    }

    _suscribe () {
        this._readDirRequest();
        this._getCoverRequest();
    }

    _readDirRequest () {
        ipcSrv.suscribe('read-dir', function(request/*, response*/){
            workspaceSrv.init();

            metadataSrv.load();

            const files = epubSrv.getEpubs();

            // Get metadata of each book
            const metas = files.map(function(epubPath){
                //Get book metadata
                return epubSrv.readEpub(workspaceSrv.workspacePath, epubPath);
            });

            return Q.all(metas).then(function(data){
                metadataSrv.dump();
                return data;
            });
        });
    }

    _getCoverRequest () {
        ipcSrv.suscribe('get-cover', function(request/*, response*/){
            return coverSrv.getCover(request.data.title, request.data.author);
        });
    }

}
