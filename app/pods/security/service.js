import Ember from 'ember';

export default Ember.Service.extend({

    pattern: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',

    getToken () {
        return this.get('pattern').replace(/[xy]/g, function(c) {
            var r = crypto.getRandomValues(new Uint8Array(1))[0]%16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
});
