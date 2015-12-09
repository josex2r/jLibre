import fs from 'fs';
import path from 'path';
import usb from 'usb';
import usbDetect from 'usb-detection';
import drivelist from 'drivelist';
import Q from 'Q';
import metadataSrv  from './metadata';

export default {

    find () {
        let deferred = Q.defer();

        drivelist.list(function(error, disks) {
            if (error){
                deferred.reject(error);
            }else{
                disks = disks.filter((device) => !device.system);
                deferred.resolve(disks);
            }
        });

        return deferred.promise;
    },

    startMonitoring (onAdd, onRemove) {
        if(typeof onAdd === 'function'){
            usbDetect.on('add:vid:pid', onAdd);
        }
        if(typeof onRemove === 'function'){
            usbDetect.on('remove:vid:pid', onRemove);
        }
    },

    stopMonitoring : () => usbDetect.stopMonitoring(),

    test (file) {
        console.log('--------------------------------------');
        console.log(usb.getDeviceList());
        console.log('--------------------------------------');
        drivelist.list(function(error, disks) {
            console.log('--------------------------------------');
            if (error) throw error;
            console.log(disks);
            console.log('--------------------------------------');
        });
    }

}
