import Ember from 'ember';
import settingsStorage from 'j-libre/pods/settings/model';

export default Ember.Component.extend({

    veil: Ember.inject.service(),

    settings: settingsStorage,

    tagName: 'nav',

    classNames: ['col-xs-8', 'col-sm-9', 'col-md-10', 'navbar', 'navbar-default', 'navbar-static-top', 'fixed'],

    devices: [],

    selected: null,

    navbarItems: Ember.computed.alias('settings.navbarItems'),

    actions: {
        selectWorkspace () {
            this.sendAction('selectWorkspace');
        }
    }

});
