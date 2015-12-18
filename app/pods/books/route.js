import Ember from 'ember';
import NavbarItems from 'j-libre/mixins/navbar-items';
import WorkspaceLoaded from 'j-libre/mixins/workspace-loaded';

export default Ember.Route.extend(NavbarItems, WorkspaceLoaded, {

    navbarItems: [
        'search',
        'workspace'
    ],

    veil: Ember.inject.service(),

    books: Ember.inject.service(),

    model () {
        this.get('veil').show();
        return this.get('books').find();
    },

    afterModel () {
        this.get('veil').hide();
        this._super(this, arguments);
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
