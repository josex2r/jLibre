import Ember from 'ember';
import WorkspaceLoaded from 'j-libre/mixins/workspace-loaded';
import settingsStorage from 'j-libre/pods/settings/model';

export default Ember.Route.extend(WorkspaceLoaded, {

    devices: Ember.inject.service(),

    settings: settingsStorage,

    model () {
        var promises = {
            devices: this.get('devices').find(true)
        };
        return Ember.RSVP.hash(promises);
    },

    afterModel: function() {
        if(this.get('settings.workspace')){
            return this.replaceWith('books');
        }
    }
});
