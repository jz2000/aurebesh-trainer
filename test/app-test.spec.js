//define(['app'], function(app) {
//    "use strict";

//    var context = require.config({
//        context: "context",
//        map: {
//          ///"*": map
//        },
//        baseUrl: 'js/cfe/app/'
//    });

//console.log('CONTEXT:' + reqcntx);
    
    define(['app', 'session-tasks', 'active-tasks'], function (app, sessionTasks, activeTasks) {


    describe("application", function () {
        var sut;

        beforeEach(function () {
        });

        it("should be initializable", function () {
            app.initialize();
            var currentTask = activeTasks.getCurrentTask();
            expect(currentTask.hitsAfterLastMiss).toEqual(0);
        });

        it("should process right answer", function () {
            app.initialize();
            var currentTask = activeTasks.getCurrentTask();
            expect(currentTask.hitsAfterLastMiss).toEqual(0);
            var myAnswer = currentTask.letter;
            app.answerCallback(myAnswer);
            expect(currentTask.hitsAfterLastMiss).toEqual(1);
        });

        it("should process wrong answer", function () {
            app.initialize();
            var currentTask = activeTasks.getCurrentTask();
            expect(currentTask.hitsAfterLastMiss).toEqual(0);
            var myAnswer = currentTask.letter + 'A';
            app.answerCallback(myAnswer);
            expect(currentTask.hitsAfterLastMiss).toEqual(0);
        });

        it("should extend pool properly", function () {
            app.initialize();
            var lettersToLearn = [1];
            var sessonMems = sessionTasks.getSessionTasks();
            for (var i = 0; i < sessonMems.length - 2; i++) {
                var mem = sessonMems[i];
                mem.hitsAfterLastMiss = 22;
            }
            
            var currentTask = activeTasks.getCurrentTask();
            var myAnswer = currentTask.letter;
            app.answerCallback(myAnswer);
            
            var taskPool = activeTasks.getTaskPool();
                
            lettersToLearn = sessionTasks.collectLettersToLearn();
            console.log(lettersToLearn.length + ':' + formatTaskPool(taskPool));
        });
        
        it("should pass through all game", function () {
            app.initialize();
            var lettersToLearn = [1];
            while (lettersToLearn.length > 0) {
                var currentTask = activeTasks.getCurrentTask();
                var myAnswer = currentTask.letter;
                app.answerCallback(myAnswer);
                var taskPool = activeTasks.getTaskPool();
                
                
                lettersToLearn = sessionTasks.collectLettersToLearn();
                console.log(lettersToLearn.length + ':' + formatTaskPool(taskPool));
            }
        });
        
        function formatTaskPool(taskPool) {
            var result = '';
            for (var i = 0; i < taskPool.length; i++) {
                var task = taskPool[i];
                result = result + task.letter + ',';
            }
            return result;
        }
       
    });
});
        