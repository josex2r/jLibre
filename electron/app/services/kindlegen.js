import fs from 'fs';
import os from 'os';
import path from 'path';
import {exec} from 'child_process';
import Q from 'Q';
import workspaceSrv from '../services/workspace';

export default {

    binPath: './bin/',

    getScriptPath () {
        const platform = os.platform();
        const ext = platform === 'win32' ? '.exe' : '';
        const dir = path.resolve(__dirname, '../', this.binPath) +
            `/kindlegen_${platform}${ext}`;
        return workspaceSrv.normalize(dir);
    },

    getMobiPath (epubPath) {
        if(workspaceSrv.isFile(epubPath)){
            const ext = path.extname(epubPath);
            const fileName = path.basename(epubPath, ext);
            const dir = `${path.dirname(epubPath)}/${fileName}.mobi`;
            return workspaceSrv.normalize(dir);
        }
        return undefined;
    },

    epubToMobi (epubPath) {
        let deferred = Q.defer();

        const scriptPath = workspaceSrv.normalize(this.getScriptPath());
        const normalizedPath = workspaceSrv.normalize(epubPath);

        exec(`${scriptPath} "${normalizedPath}"`, function(error, stdout, stderr) {
            if (error) {
                deferred.reject(error);
            }else{
                deferred.resolve(stdout);
            }
        });

        return deferred.promise;
    }

}
