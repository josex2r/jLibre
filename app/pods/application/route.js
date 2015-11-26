import Ember from 'ember';

export default Ember.Route.extend({

    epub: Ember.inject.service('epub'),

    devices: Ember.inject.service('devices'),

    model () {
        var promises = {
            epubs: this.get('epub').find(),
            devices: this.get('devices').find()
        };
        return Ember.RSVP.hash(promises);
    }
});
