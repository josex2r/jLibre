import Ember from 'ember';

export default Ember.Component.extend({

    ipc: Ember.inject.service('ipc'),

    index: null,

    data: null,

    actions: {

        transfer () {
            this.get('ipc').send('transfer', this.get('data.file'), true);
        },

        showDetail () {
            this.sendAction('showDetail', this.get('index'));
        }

    }

});
