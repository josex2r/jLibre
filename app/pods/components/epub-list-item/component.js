import Ember from 'ember';

export default Ember.Component.extend({

    ipc: Ember.inject.service('ipc'),

    index: null,

    data: null,

    style: Ember.computed('data.cover', function() {
        var cover = this.get('data.cover');
        return new Ember.Handlebars.SafeString(`background-image: url('${cover}')`);
    }),

    actions: {

        transfer () {
            this.get('ipc').send('transfer', {
                data: this.get('data.file'),
                sync: true
            });
        },

        showDetail () {
            this.sendAction('showDetail', this.get('index'));
        }

    }

});
