define([], function() {
    "use strict";

    function Letter(letter) {
        return {
            letter : letter,
            attempts : 0,
            hits : 0,
            misses : 0,
            hitsAfterLastMiss :0
        };
    }
    
    return {
        Letter: Letter
    };
});