import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
    this.route('test');
    this.route('books', function() {
        this.route('detail', {path: "/:index"});
    });
});

export default Router;
