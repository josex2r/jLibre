import ipc from 'ipc';

export default {

    requestName: 'ipcServiceRequest',

    responseName: 'ipcServiceResponse',

    suscriptions: [],

    init () {
        ipc.on(this.requestName, function(event, request) {
            request = JSON.parse(request);
            console.log('IPC | Received request: ', request);
            this.suscriptions.forEach(function(suscription){
                if(request.name === suscription.name){
                    let response = {
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

    suscribe (name, cb) {
        this.suscriptions.push({
            name: name,
            cb: cb
        });
        console.log('IPC | Suscribed to: ', name);
    }

}
