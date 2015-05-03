define([], function() {
    "use strict";

    var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 
        'W', 'X', 'Y', 'Z',
        'TH', 'SH', 'OO', 'KH', 'NG', 'CH', 'EO', 'AE',
        '0', '1', '2', '3', '4', '5', '6', '7',
        '8', '9'/*,
        ',', '.', '?', '!', ':', ';', ' ', '"', '`', "'", '(', ')', '/', '$' */ 
    ];

    var getAllTasks = function() {
        return letters.slice(0, letters.length);
    };

    return {
        getAllTasks: getAllTasks 
    };
});

