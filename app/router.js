import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {

    this.route('books', function() {
        this.route('detail', {
            path: "/:index"
        });
    });

    this.route('workspaces');
});

export default Router;
