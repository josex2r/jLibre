import ipcSrv from '../services/ipc';
import workspaceSrv from '../services/workspace';
import dialog from 'dialog';
import sleep from 'sleep';

export default class ApplicationIndex {

    constructor (window) {
        this.window = window;
        ipcSrv.init();
        this._suscribe();
    }

    _suscribe () {
        ipcSrv.suscribe('read-dir', function(/*request, response*/){
            let workspacePath = dialog.showOpenDialog({ properties: ['openDirectory'] });
            if(!workspacePath){
                return [];
            }else{
                workspacePath = workspacePath[0];
            }
            let files = workspaceSrv.getEpubs(workspacePath);
            let metadata;
            workspaceSrv.readEpub(workspacePath, files[0]).then(function(data){
                metadata = data;
            });
            return metadata;
        });
    }

}
