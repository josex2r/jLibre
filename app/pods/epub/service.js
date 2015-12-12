import Ember from 'ember';
import settingsStorage from 'j-libre/pods/settings/model';

export default Ember.Service.extend({

    epubs: Ember.A([]),

    ipc: Ember.inject.service(),

    settings: settingsStorage,

    find (sync){
        if(!this.get('epubs').length){
            return this.fetch(sync);
        }else{
            return new Ember.RSVP.Promise(resolve => resolve(this.get('epubs')));
        }
    },

    fetch (sync){
        return this.get('ipc').send('read-dir', this.get('settings.workspace'), sync).then(function(response){
            response.data = response.data || [];

            this.get('epubs').pushObjects(response.data);

            return this.get('epubs');
        }.bind(this));
    },

    selectWorkspace (){
        return this.get('ipc').send('select-workspace', undefined, true).then(function(response){
            if(response.data){
                this.set('settings.workspace', response.data);
                this.get('settings').save();
            }
            return response;
        }.bind(this));
    }

});
