var ipc = require('ipc');

module.exports = {

    requestName: 'ipcServiceRequest',

    responseName: 'ipcServiceResponse',

    suscriptions: [],

    init: function(){
        ipc.on(this.requestName, function(event, request) {
            request = JSON.parse(request);
            console.log('IPC | Received request: ', request);
            this.suscriptions.forEach(function(suscription){
                if(request.name === suscription.name){
                    var response = {
                        name: request.name,
                        type: 'response',
                        timestamp: request.timestamp,
                        data: suscription.cb(request, response)
                    };
                    console.log('IPC | Sending response: ', response);
                    if(!request.sync){
                        event.sender.send(this.responseName, JSON.stringify(response));
                    }else{
                        event.returnValue = JSON.stringify(response);
                    }
                }
            }.bind(this));
        }.bind(this));
    },

    suscribe: function(name, cb){
        this.suscriptions.push({
            name: name,
            cb: cb
        });
        console.log('IPC | Suscribed to: ', name);
    }

};
