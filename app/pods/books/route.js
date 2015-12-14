import Ember from 'ember';
import WorkspaceLoaded from 'j-libre/mixins/workspace-loaded';

export default Ember.Route.extend(WorkspaceLoaded, {

    veil: Ember.inject.service(),

    books: Ember.inject.service(),

    beforeModel () {
        this.get('veil').show();
    },

    model () {
        return this.get('books').find();
    },

    afterModel () {
        this.get('veil').hide();
    },

    actions: {
        refresh () {
            return this.get('books').find(true);
        },

        showDetail (index) {
            this.replaceWith('books.detail', index);
        }
    }

});
