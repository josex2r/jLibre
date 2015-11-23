import fs from 'fs';
import path from 'path';
import EPub from 'epub';
import Q from 'Q';
import co from 'co';
import request from 'request';
import querystring from 'querystring';
import mkdirp  from 'mkdirp';
import dialog from 'dialog';
import epubSrv  from './epub';
import coverSrv  from './cover';
import metadataSrv  from './metadata';

let singleton = Symbol();
let singletonEnforcer = Symbol();

export default {

    workspacePath: '',

    init () {
        const workspacePath = dialog.showOpenDialog({ properties: ['openDirectory'] });
        if(!workspacePath){
            throw 'Cannot init workspace';
        }
        this.setWorkspace(workspacePath[0]);
    },

    setWorkspace (dir) {
        this.workspacePath = `${dir}${path.sep}`;
        epubSrv.setWorkspace(this.workspacePath);
        coverSrv.setWorkspace(this.workspacePath);
        metadataSrv.setWorkspace(this.workspacePath);
    }

}
