import Ember from 'ember';

export default Ember.Route.extend({

    ipc: Ember.inject.service('ipc'),

    model () {
        return this.get('ipc').send('read-dir').then(function(response){
            return response.data;
        });
    }
});
