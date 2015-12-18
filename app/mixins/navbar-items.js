import Ember from 'ember';
import settingsStorage from 'j-libre/pods/settings/model';

export default Ember.Mixin.create({

    settings: settingsStorage,

    afterModel () {
        const items = this.get('navbarItems') || this.get('settings.initialContent.navbarItems');
        let navbarItems = {};
        items.forEach((key) => (navbarItems[key]= true));
        this.set('settings.navbarItems', navbarItems);
        this._super(this, arguments);
    }

});
