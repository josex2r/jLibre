import StorageObject from 'ember-local-storage/local/object';

export default StorageObject.create({
    storageKey: 'settings',

    initialContent: {
        workspace: null
    }
});
