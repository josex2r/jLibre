import Ember from 'ember';
import NavbarItems from 'j-libre/mixins/navbar-items';

export default Ember.Route.extend(NavbarItems, {

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
