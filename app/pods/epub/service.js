import Ember from 'ember';

export default Ember.Service.extend({

    epubs: Ember.A([]),

    ipc: Ember.inject.service('ipc'),

    find (sync){
        if(!this.get('epubs').length){
            return this.fetch(sync);
        }else{
            return new Ember.RSVP.Promise(resolve => resolve(this.get('epubs')));
        }
    },

    fetch (sync){
        return this.get('ipc').send('read-dir', undefined, sync).then(function(response){
            response.data = response.data || [];

            this._fetchCovers(response.data);
            this.get('epubs').pushObjects(response.data);

            return this.get('epubs');
        }.bind(this));
    },

    _fetchCovers (data) {
        return this.get('ipc').send('get-cover', data).then(function(response){
            response.data.forEach(function(cover, index){
                Ember.set(this.get(`epubs.${index}`), 'cover', cover);
            }.bind(this));
        }.bind(this));
    }
});
