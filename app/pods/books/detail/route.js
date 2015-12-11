import Ember from 'ember';

export default Ember.Route.extend({

    data: null,

    beforeModel (transition) {
        const index = transition.params['books.detail'].index;

        this.set('data', transition.resolvedModels.books[index]);
    },

    model () {
        return this.get('data');
    }

});
