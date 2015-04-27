define(['app'], function(app) {
    "use strict";
    
    app.wireUpLanguageSwitch();

    app.switchToHighGalactic();

    app.resetStatistics();

    app.restoreTaskPool();

    app.renderStatus();

    app.generateTask();

    app.renderResult(app.currentTask.letter, '?');

    app.wireUpForm();
});