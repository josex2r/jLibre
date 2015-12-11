import Ember from 'ember';
import WorkspaceLoaded from 'j-libre/mixins/workspace-loaded';

export default Ember.Route.extend(WorkspaceLoaded, {

    devices: Ember.inject.service(),

    model () {
        var promises = {
            devices: this.get('devices').find(true)
        };
        return Ember.RSVP.hash(promises);
    }
});
