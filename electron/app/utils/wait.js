var Fiber = require('fibers');

module.exports = {

    for: function(fn){
        return Fiber(function() {
            fn.apply(fn, Array.prototype.slice.call(arguments, 1));
        }).run();
    }
};
