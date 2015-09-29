import Ember from 'ember';
import IpcModel from './model';

export default Ember.Service.extend({

    ipc: require('ipc'),

    requestName: 'ipcServiceRequest',

    responseName: 'ipcServiceResponse',

    stack: [],

    init: function(){
        this.get('ipc').on(this.get('responseName'), function(arg){
            // TODO Get the response & resolve the promise
            Ember.Logger.info('IPC | Response for ', request, ' => ', arg);
            clearTimeout(timeout);
            resolve(arg);
        });
    },

    send: function(name, data){
        var request = IpcModel.create({
            name: name,
            type: 'request'
        });

        Ember.Logger.log('IPC | Sending ', request);
        this.get('ipc').send(this.get('requestName'), JSON.stringify(request));

        var promise = new Ember.RSVP.Promise(function(resolve, reject) {
            // Die on timeout
            var timeout = setTimeout(function(){
                Ember.Logger.error('IPC | Timeout for ', request);
                // Remove from stack
                this.get('stack').removeObject(promise);
                // Reject promise
                reject();
            }.bind(this), request.get('timeout'));
        }.bind(this));

        this.get('stack').addObject(promise);

        return promise;
    }

});
