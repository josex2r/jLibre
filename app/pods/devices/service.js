import Ember from 'ember';

export default Ember.Service.extend({

    devices: Ember.A([]),

    ipc: Ember.inject.service('ipc'),

    find (){
        if(!this.get('devices').length){
            return this.fetch();
        }else{
            return new Ember.RSVP.Promise(resolve => resolve(this.get('devices')));
        }
    },

    fetch (){
        return this.get('ipc').send('get-devices').then(function(response){
            response.data = response.data || [];
            this.get('devices').pushObjects(response.data);
            return this.get('devices');
        }.bind(this));
    }
});
