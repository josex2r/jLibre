import Ember from 'ember';

export default Ember.Component.extend({

    veil: Ember.inject.service(),

    tagName: 'nav',

    classNames: ['col-xs-8', 'col-sm-9', 'col-md-10', 'navbar', 'navbar-default', 'navbar-static-top', 'fixed'],

    devices: [],

    selected: null,

    actions: {
        selectWorkspace () {
            this.sendAction('selectWorkspace');
        }
    }

});
