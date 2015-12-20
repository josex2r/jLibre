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

    getFiles (dir) {
        return fs.readdirSync(`${this.workspacePath}${dir}`) || [];
    },

    _getFilesRecursively (dir, depth) {
        let results = [];
        let list = this.getFiles(dir);
        if(depth){
            list.forEach(function(file) {
                const fileName = `${dir}${file}`;
                const fileDir = `${fileName}/`;
                if(this.isDirectory(`${this.workspacePath}${fileDir}`)){
                    results = results.concat(
                        this._getFilesRecursively(fileDir, depth - 1)
                    );
                }else{
                    results.push(fileName);
                }
            }.bind(this));
        }
        return results;
    }

}
