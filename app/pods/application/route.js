import Ember from 'ember';

export default Ember.Route.extend({

    epub: Ember.inject.service('epub'),

    devices: Ember.inject.service('devices'),

    model () {
        var promises = {
            epubs: this.get('epub').find(true),
            devices: this.get('devices').find(true)
        };
        return Ember.RSVP.hash(promises);
    }
});
