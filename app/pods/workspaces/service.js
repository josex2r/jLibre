import Ember from 'ember';
import workspacesStorage from 'j-libre/pods/workspaces/model';
import settingsStorage from 'j-libre/pods/settings/model';

export default Ember.Service.extend({

    ipc: Ember.inject.service(),

    workspaces: workspacesStorage,

    settings: settingsStorage,

    content: Ember.computed.alias('workspaces._content'),

    add (path, meta) {
        var workspace = this.get('workspaces').findBy('path', path);
        if(!workspace){
            meta = meta || {};
            var data = {path, meta};
            this.get('workspaces').addObject(data);
        }else{
            Ember.set(workspace, 'meta', meta);
        }
        this.get('workspaces').save();
    },

    remove (path) {
        var workspace = this.get('workspaces').findBy('path', path);
        if(!workspace){
            this.get('workspaces').removeObject(path);
        }else{
            this.get('workspaces').removeObject(workspace);
        }
        this.get('workspaces').save();
    },

    selectWorkspace (){
        return this.get('ipc').send('select-workspace', undefined, true).then(function(response){
            if(response.data){
                this.set('settings.workspace', response.data);
                this.get('settings').save();
                this.add(response.data);
            }
            return response;
        }.bind(this));
    }

});
