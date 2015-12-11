import StorageArray from 'ember-local-storage/local/array';

export default StorageArray.create({
    storageKey: 'quotes',

    initialContent: [{
        author: 'Stephen King',
        text: 'I try to create sympathy for my characters, then turn the monsters loose.'
    }, {
        author: 'Mark Twain',
        text: 'Most writers regard the truth as their most valuable possession, and therefore are most economical in its use.'
    }, {
        author: 'Isaac Asimov',
        text: 'It is the writer who might catch the imagination of young people, and plant a seed that will flower and come to fruition.'
    }, {
        author: 'Terry Pratchett',
        text: 'There’s no such thing as writer’s block. That was invented by people in California who couldn’t write.'
    }, {
        author: 'Oscar Wilde',
        text: 'A poet can survive everything but a misprint.'
    }, {
        author: 'Stephen King',
        text: 'The road to hell is paved with adverbs.'
    }, {
        author: 'Tom Clancy',
        text: 'I do not over-intellectualize the production process. I try to keep it simple: Tell the damned story.'
    }]
});
