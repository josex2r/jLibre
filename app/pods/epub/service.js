import Ember from 'ember';

export default Ember.Service.extend({

    epubs: Ember.A([]),

    ipc: Ember.inject.service('ipc'),

    find (){
        if(!this.get('epubs').length){
            return this.fetch();
        }else{
            return new Ember.RSVP.Promise(resolve => resolve(this.get('epubs')));
        }
    },

    fetch (){
        return this.get('ipc').send('read-dir').then(function(response){
            let promises = [];
            response.data.forEach(function(metadata, index){
                // Get cover
                let promise;
                const lastPromise = promises[promises.length - 1];
                if(lastPromise){
                    lastPromise.then(function(){
                        promise = this._fetchCover(metadata);
                        promises.push(promise);
                    }.bind(this));
                }else{
                    promise = this._fetchCover(metadata);
                }
                promises.push(promise);
            }.bind(this));

            this.get('epubs').pushObjects(response.data);

            return this.get('epubs');
        }.bind(this));
    },

    _fetchCover (metadata) {
        return this.get('ipc').send('get-cover', {
            title: metadata.title,
            author: metadata.creator
        }).then(function(response){
            Ember.set(metadata, 'cover', response.data);
        });
    }
});
