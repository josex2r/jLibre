import Ember from 'ember';
import settingsStorage from 'j-libre/pods/settings/model';

export default Ember.Service.extend({

    books: [],

    ipc: Ember.inject.service(),

    workspaces: Ember.inject.service(),

    settings: settingsStorage,

    workspaceClean: Ember.observer('settings.workspace', function(){
        this.get('books').clear();
    }),

    find (sync){
        if(!this.get('books').length){
            return this.fetch(sync);
        }else{
            return new Ember.RSVP.Promise(resolve => resolve(this.get('books')));
        }
    },

    fetch (sync){
        var workspace = this.get('settings.workspace');

        return this.get('ipc').send('read-dir', workspace, sync).then(function(response){
            response.data = response.data || [];

            this.get('books').pushObjects(response.data);

            var filteredMeta = response.data.map(function(meta){
                return {
                    title: meta.title,
                    cover: meta.cover,
                    creator: meta.creator
                };
            });
            this.get('workspaces').add(workspace, {books: filteredMeta});

            return this.get('books');
        }.bind(this));
    }

});
