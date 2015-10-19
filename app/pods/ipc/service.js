import Ember from 'ember';
import IpcModel from './model';

export default Ember.Service.extend({

    ipc: require('ipc'),

    requestName: 'ipcServiceRequest',

    responseName: 'ipcServiceResponse',

    stack: [],

    init: function(){
        this.get('ipc').on(this.get('responseName'), function(data){
            data = JSON.parse(data);
            this.get('stack').forEach(function(promise){
                if(promise.request.timestamp === data.timestamp &&
                   promise.request.name === data.name){
                    promise.deferred.resolve(data);
                }
            });
        }.bind(this));
    },

    send: function(name, data, sync){
        var request = IpcModel.create({
            name: name,
            type: 'request',
            data: data,
            sync: sync === true
        });

        Ember.Logger.log('IPC | Sending request: ', request);
        var reqType = this.get('ipc')[request.sync ? 'sendSync' : 'send'];
        reqType(this.get('requestName'), JSON.stringify(request.serialize()));

        if(!request.sync){
            this.get('ipc').send(this.get('requestName'), JSON.stringify(request.serialize()));

            var deferred = new Ember.RSVP.defer(),
                promise = deferred.promise,
                timeout = setTimeout(function(){
                    // Reject promise
                    deferred.reject('timeout');
                }, request.get('timeout'));;

            // Set promise data
            promise.request = request;
            promise.deferred = deferred;

            promise.then(function(data){
                Ember.Logger.info('IPC | Response for ', promise.request);
            }).catch(function(error){
                switch(error){
                    case 'timeout':
                        Ember.Logger.error('IPC | Timeout for ', request);
                        break;
                    default:
                        Ember.Logger.error('IPC | Error for ', request);
                }
            }).finally(function(){
                if(timeout){
                    clearTimeout(timeout);
                }
                // Remove from stack
                this.get('stack').removeObject(promise);
            }.bind(this));

            this.get('stack').addObject(promise);

            return promise;
        }else{
            return this.get('ipc').sendSync(this.get('requestName'), JSON.stringify(request.serialize()));
        }

    }

});
