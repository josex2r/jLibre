import Ember from 'ember';
import settingsStorage from 'j-libre/pods/settings/model';

export default Ember.Service.extend({

    content: [],

    ipc: Ember.inject.service(),

    workspaces: Ember.inject.service(),

    settings: settingsStorage,

    workspaceClean: Ember.observer('settings.workspace', function(){
        this.get('content').clear();
    }),

    find (){
        if(!this.get('content').length){
            return this.fetch();
        }else{
            return new Ember.RSVP.Promise(resolve => resolve(this.get('content')));
        }
    },

    fetch (){
        var workspace = this.get('settings.workspace');

        return this.get('ipc').send('read-dir', {
            data: workspace,
            sync: true,
            timeout: null
        }).then(function(response){
            response.data = response.data || [];

            this.get('content').pushObjects(response.data);

            var filteredMeta = response.data.map(function(meta){
                return {
                    title: meta.title,
                    cover: meta.cover,
                    creator: meta.creator
                };
            });
            if(filteredMeta){
                this.get('workspaces').add(workspace, {books: filteredMeta});
            }

            return this.get('content');
        }.bind(this));
    }

});
