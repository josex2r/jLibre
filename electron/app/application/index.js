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
        ipcSrv.suscribe('read-dir', function(request/*, response*/){
            let workspacePath = dialog.showOpenDialog({ properties: ['openDirectory'] });
            if(!workspacePath){
                return [];
            }else{
                workspacePath = workspacePath[0];
            }
            let files = workspaceSrv.getEpubs(workspacePath);
            // Get metadata of each book
            const metas = files.map(function(epubPath){
                //Get book metadata
                return workspaceSrv.readEpub(workspacePath, epubPath);
            });
            return Q.all(metas);
        });
    }

}
