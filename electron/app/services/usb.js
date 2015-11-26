import fs from 'fs';
import path from 'path';
import usb from 'usb';
import usbDetect from 'usb-detection';
import Q from 'Q';
import metadataSrv  from './metadata';

export default {

    find : () => usbDetect.find(),

    stopMonitoring : () => usbDetect.stopMonitoring(),

    test (file) {
        const metadata = metadataSrv.findByFile(file);
        console.log('--------------------------------------');
        console.log(usb.getDeviceList());
        console.log('--------------------------------------');

        // Promise version of `find`:
        usbDetect.find().then(function(devices) { console.log(devices); }).catch(function(err) { console.log(err); });

        // Detect add/insert
        usbDetect.on('add', function(device) { console.log('add', device); });
        usbDetect.on('add:vid', function(device) { console.log('add', device); });
        usbDetect.on('add:vid:pid', function(device) { console.log('add', device); });

        // Detect remove
        usbDetect.on('remove', function(device) { console.log('remove', device); });
        usbDetect.on('remove:vid', function(device) { console.log('remove', device); });
        usbDetect.on('remove:vid:pid', function(device) { console.log('remove', device); });

        usbDetect.stopMonitoring();
    }

}
