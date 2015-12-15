import Ember from 'ember';

export default Ember.Route.extend({

    workspaces: Ember.inject.service(),

    model () {
        return this.get('workspaces.content').map(function(workspace){
            return {
                path: workspace.path,
                covers: workspace.meta.books.mapBy('cover')
            }
        });
    }

});
