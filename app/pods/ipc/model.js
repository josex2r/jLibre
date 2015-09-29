export default Ember.Object.extend({
    type: null,

    timestamp: new Date().getTime(),

    name: null,

    timeout: 10000,

    toObject: function() {
        return JSON.parse(JSON.stringify(this));
    }
});
