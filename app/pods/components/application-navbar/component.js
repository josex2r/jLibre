import Ember from 'ember';

export default Ember.Component.extend({

    veil: Ember.inject.service(),

    tagName: 'nav',

    classNames: ['navbar', 'navbar-default', 'navbar-static-top', 'fixed'],

    devices: [],

    selected: null

});
