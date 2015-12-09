import os from 'os';
import path from 'path';
import childProcess from 'child_process';
import Q from 'Q';

export default {

    parse () {
        let deferred = Q.defer();
        const platform = os.platform();
        let script = path.join(__dirname, `kindlegen_${platform}`);

        childProcess.execFile(script, function(error, stdout, stderr) {
            if (error) {
                deferred.reject(error);
            }else{
                deferred.resolve(stdout);
            }
        });

        return deferred.promise;
    }

}
