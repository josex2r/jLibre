import ipcSrv from '../services/ipc';
import workspaceSrv from '../services/workspace';
import epubSrv  from '../services/epub';
import coverSrv  from '../services/cover';
import metadataSrv  from '../services/metadata';
import kindlegenSrv  from '../services/kindlegen';
import usbSrv  from '../services/usb';
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
        this._getDevicesRequest();
        this._transferRequest();
        this._selectWorkspace();
    }

    _readDirRequest () {
        ipcSrv.suscribe('read-dir', function(request/*, response*/){
            if(request.data){
                workspaceSrv.setWorkspace(request.data);
            }else{
                workspaceSrv.init();
            }

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
            var covers = request.data.map(function(metadata){
                return coverSrv.getCover(metadata.title, metadata.creator);
            });

            return Q.all(covers);
        });
    }

    _getDevicesRequest () {
        ipcSrv.suscribe('get-devices', function(request/*, response*/){
            return usbSrv.find();
        });
    }

    _transferRequest () {
        ipcSrv.suscribe('transfer', function(request/*, response*/){
            const epubPath = request.data;
            let mobiPath = kindlegenSrv.getMobiPath(epubPath);
            try {
                workspaceSrv.isFile(mobiPath);
            }catch (e){
                return kindlegenSrv.epubToMobi(epubPath).then(function(){
                    return mobiPath;
                });
            }
            return mobiPath;
        });
    }

    _selectWorkspace () {
        ipcSrv.suscribe('select-workspace', function(request/*, response*/){
            return workspaceSrv.init();
        });
    }

}
