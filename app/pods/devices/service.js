import Ember from 'ember';

export default Ember.Service.extend({

    devices: Ember.A([]),

    ipc: Ember.inject.service('ipc'),

    find (sync){
        if(!this.get('devices').length){
            return this.fetch(sync);
        }else{
            return new Ember.RSVP.Promise(resolve => resolve(this.get('devices')));
        }
    },

    fetch (sync){
        return this.get('ipc').send('get-devices', {sync: sync}).then(function(response){
            response.data = response.data || [];
            this.get('devices').pushObjects(response.data);
            return this.get('devices');
        }.bind(this));
    }
});
