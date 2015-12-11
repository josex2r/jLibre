import fs from 'fs';
import path from 'path';
import dialog from 'dialog';
import epubSrv  from './epub';
import coverSrv  from './cover';
import metadataSrv  from './metadata';

export default {

    workspacePath: '',

    init () {
        const workspacePath = dialog.showOpenDialog({ properties: ['openDirectory'] });
        if(!workspacePath){
            return;
        }else{
            this.setWorkspace(workspacePath[0]);
            return this.workspacePath;
        }
    },

    setWorkspace (dir) {
        this.workspacePath = this.normalize(`${dir}`);
        epubSrv.setWorkspace(this.workspacePath);
        coverSrv.setWorkspace(this.workspacePath);
        metadataSrv.setWorkspace(this.workspacePath);
    },

    normalize (dir) {
        return dir.replace(/\\/g, '/'); //.replace(/([ ])/g, '\\$1');
    },

    isFile (dir) {
        const stat = fs.statSync(dir);
        return stat && stat.isFile();
    }

}
