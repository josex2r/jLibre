import Ember from 'ember';
import settingsStorage from 'j-libre/pods/settings/model';

export default Ember.Controller.extend({

    settings: settingsStorage,

    workspaceChanged: Ember.observer('settings.workspace', function(){
        this.send('refresh');
    })

});
