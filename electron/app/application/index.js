import ipcSrv from '../services/ipc';
import workspaceSrv from '../services/workspace';
import dialog from 'dialog';
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
            const workspacePath = dialog.showOpenDialog({ properties: ['openDirectory'] });
            if(!workspacePath){
                return [];
            }
            workspaceSrv.setWorkspace(workspacePath[0]);
            const files = workspaceSrv.getEpubs();
            // Get metadata of each book
            const metas = files.map(function(epubPath){
                //Get book metadata
                return workspaceSrv.readEpub(workspacePath, epubPath);
            });
            return Q.all(metas);
        });
    }

    _getCoverRequest () {
        ipcSrv.suscribe('get-cover', function(request/*, response*/){
            return workspaceSrv.getCover(request.data.title, request.data.author);
        });
    }

}
