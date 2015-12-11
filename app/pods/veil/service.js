import Ember from 'ember';

export default Ember.Service.extend({

    visible: false,

    show () {
        this.set('visible', true);
    },

    hide () {
        this.set('visible', false);
    }

});
