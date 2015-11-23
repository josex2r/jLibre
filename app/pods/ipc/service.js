import Ember from 'ember';
import IpcModel from './model';

export default Ember.Service.extend({

    security: Ember.inject.service('security'),

    ipc: require('ipc'),

    requestName: 'ipcServiceRequest',

    responseName: 'ipcServiceResponse',

    stack: [],

    init () {
        this.get('ipc').on(this.get('responseName'), function(response){
            response = JSON.parse(response);
            this.get('stack').forEach(function(request){
                if(request.timestamp === response.timestamp &&
                   request.uuid === response.uuid &&
                   request.name === response.name){
                    if(response){
                        request.deferred.resolve(response);
                    }else{
                        request.deferred.reject();
                    }
                }
            });
        }.bind(this));
    },

    send (name, data, sync) {
        // Set request data
        var request = IpcModel.create({
            name: name,
            type: 'request',
            data: data,
            sync: sync === true,
            uuid: this.get('security').getToken()
        });
        Ember.Logger.log('IPC | Sending request: ', request);

        // Remove request when ready
        request.deferred.promise.finally(function(){
            // Remove from stack
            this.get('stack').removeObject(request);
        }.bind(this));

        this[request.sync ? '_sendSync' : '_sendAsync'](request);

        return request.deferred.promise;
    },

    _sendAsync (request) {
        // Serialize request data
        var _requestData = JSON.stringify(request.serialize());

        this.get('ipc').send(this.get('requestName'), _requestData);

        this.get('stack').addObject(request);
    },

    _sendSync (request) {
        // Serialize request data
        var _requestData = JSON.stringify(request.serialize());

        var response = this.get('ipc').sendSync(this.get('requestName'), _requestData);

        request.deferred[response ? 'resolve' : 'reject'](response);
    }

});
