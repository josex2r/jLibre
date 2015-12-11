import Ember from 'ember';
import _ from 'lodash/lodash';
import settingsStorage from 'j-libre/pods/settings/model';
import quotesStorage from 'j-libre/pods/quotes/model';

export default Ember.Controller.extend({

    epub: Ember.inject.service(),

    veil: Ember.inject.service(),

    settings: settingsStorage,

    quotes: quotesStorage,

    decicesNames: Ember.computed.mapBy('model.devices', 'description'),

    quote: Ember.computed('quotes.[]', function(){
        return _.sample(this.get('quotes._content'));
    }),

    actions: {
        selectWorkspace () {
            this.get('epub').selectWorkspace().then(function(response){
                if(response.data){
                    this.replaceRoute('books');
                }
            }.bind(this));
        }
    }

});
