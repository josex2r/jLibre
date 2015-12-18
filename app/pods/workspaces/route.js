import Ember from 'ember';

export default Ember.Route.extend({

    workspaces: Ember.inject.service(),

    model () {
        return this.get('workspaces.content').map(function(workspace){
            const booksMeta = workspace.meta.books || [];
            
            return {
                path: workspace.path,
                covers: booksMeta.mapBy('cover')
            }
        });
    }

});
