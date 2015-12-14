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
        dir = dir.replace(/\\/g, '/'); //.replace(/([ ])/g, '\\$1');
        if(dir[dir.length - 1] !== '/'){
            dir = `${dir}/`;
        }
        console.log(dir)
        return dir;
    },

    isFile (dir) {
        try{
            const stat = fs.statSync(dir);
            return stat && stat.isFile();
        } catch (e) {
            return false;
        }
    },

    isDirectory (dir) {
        try{
            const stat = fs.statSync(dir);
            return stat && stat.isDirectory();
        } catch (e) {
            return false;
        }
    },

}
