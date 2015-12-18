import Ember from 'ember';
import SerializableModel from 'j-libre/mixins/serializable-model';

export default Ember.Object.extend(SerializableModel, {
    propertyNames: 'type sync timestamp name timeout data uuid'.w(),

    uuid: null,

    deferred: null,

    type: null,

    sync: false,

    timestamp: new Date().getTime(),

    name: null,

    timeout: 10000,

    init: function(){
        // Create deferred
        this.set('deferred', new Ember.RSVP.defer());

        // Create request timeout
        if(this.get('timeout')){
            var timeout = setTimeout(function(){
                // Reject promise
                this.get('deferred').reject('timeout');
            }.bind(this), this.get('timeout'));
        }

        // Bind promise
        this.get('deferred.promise').then(function(response){
            Ember.Logger.info('IPC | Response for ', this.get('name'), ' => ', response);
        }.bind(this)).catch(function(error){
            switch(error){
                case 'timeout':
                    Ember.Logger.error('IPC | Timeout for ', this);
                    break;
                default:
                    Ember.Logger.error('IPC | Error for ', this);
            }
        }.bind(this)).finally(function(){
            if(timeout){
                clearTimeout(timeout);
            }
        }.bind(this));
    },

    toObject: function() {
        return JSON.parse(JSON.stringify(this));
    }
});
