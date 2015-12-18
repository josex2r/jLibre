import Ember from 'ember';

export default Ember.Service.extend({

    visible: false,

    _show () {
        this.set('visible', true);
    },

    _hide () {
        this.set('visible', false);
    },

    show () {
        Ember.run.scheduleOnce('afterRender', this, '_show');
    },

    hide () {
        Ember.run.scheduleOnce('afterRender', this, '_hide');
    }

});
