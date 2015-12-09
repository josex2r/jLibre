import Ember from 'ember';

export default Ember.Controller.extend({

    decicesNames: Ember.computed.mapBy('model.devices', 'description'),

});
