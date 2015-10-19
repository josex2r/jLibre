var ipcService = require('../services/ipc');

module.exports = function(window){
    this.window = window;

    ipcService.init();

    ipcService.suscribe('read-dir', function(/*request, response*/){
        return 'I\'m your father';
    });
};
