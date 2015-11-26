import Ember from 'ember';

export default Ember.Component.extend({

    ipc: Ember.inject.service('ipc'),

    data: null,

    separator: true,

    actions: {

        transfer () {
            this.get('ipc').send('transfer', this.get('data.file'), true);
        }

    }

});
