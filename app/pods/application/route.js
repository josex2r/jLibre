import Ember from 'ember';

export default Ember.Route.extend({

    epub: Ember.inject.service('epub'),

    model () {
        return this.get('epub').find();
    }
});
