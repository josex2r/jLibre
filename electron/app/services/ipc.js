import ipc from 'ipc';
import Q from 'Q';

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
                        sync: request.sync,
                        name: request.name,
                        type: 'response',
                        timestamp: request.timestamp,
                        uuid: request.uuid,
                        data: suscription.cb(request, response)
                    };
                    // Check if data is a promise
                    if(response.data && typeof response.data.then === 'function'){
                        response.data.then(function(data){
                            response.data = data;
                            this._dispatchResponse.call(this, event, response);
                        }.bind(this));
                    }else{
                        this._dispatchResponse.call(this, event, response);
                    }
                }
            }.bind(this));
        }.bind(this));
    },

    _dispatchResponse (event, response) {
        console.log('IPC | Sending response: ', response);
        if(!response.sync){
            event.sender.send(this.responseName, JSON.stringify(response));
        }else{
            event.returnValue = JSON.stringify(response);
        }
    },

    suscribe (name, cb) {
        this.suscriptions.push({
            name: name,
            cb: cb
        });
        console.log('IPC | Suscribed to: ', name);
    }

}
