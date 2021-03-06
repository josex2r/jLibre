import Ember from 'ember';
import settingsStorage from 'j-libre/pods/settings/model';

export default Ember.Mixin.create({

    settings: settingsStorage,

    workspaceListener: Ember.observer('settings.workspace', function(){
        if(!this.get('settings.workspace')){
            return this.replaceWith('application');
        }
    }),

    beforeModel: function() {
        if(!this.get('settings.workspace')){
            return this.replaceWith('application');
        }else{
            this._super.apply(this, arguments);
        }
    }
});
