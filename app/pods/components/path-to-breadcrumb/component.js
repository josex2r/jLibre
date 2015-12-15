import Ember from 'ember';

export default Ember.Component.extend({

    tagName: 'ol',

    classNames: ['breadcrumb'],

    data: null,

    crumbs: Ember.computed('data', function(){
        return this.get('data').split('/');
    })

});
