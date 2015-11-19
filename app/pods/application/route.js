import Ember from 'ember';

export default Ember.Route.extend({

    ipc: Ember.inject.service('ipc'),

    model () {
        return this.get('ipc').send('read-dir').then(function(response){
            let promises = [];
            response.data.forEach(function(metadata, index){
                let promise;
                const lastPromise = promises[promises.length - 1];
                // Get cover
                if(lastPromise){
                    lastPromise.then(function(){
                        promise = this._getCover(metadata);
                        promises.push(promise);
                    }.bind(this))
                }else{
                    promise = this._getCover(metadata);
                }
                promises.push(promise);
            }.bind(this))
            return response.data;
        }.bind(this));
    },

    _getCover (metadata) {
        return this.get('ipc').send('get-cover', {
            title: metadata.title,
            author: metadata.creator
        }).then(function(response){
            Ember.set(metadata, 'cover', response.data);
        });
    }
});
