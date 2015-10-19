import SerializableModel from '../../mixins/serializable-model';

export default Ember.Object.extend(SerializableModel, {
    propertyNames: 'type sync timestamp name timeout'.w(),

    type: null,

    sync: false,

    timestamp: new Date().getTime(),

    name: null,

    timeout: 10000,

    toObject: function() {
        return JSON.parse(JSON.stringify(this));
    }
});
