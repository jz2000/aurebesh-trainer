define(['active-tasks', 'session-mem'], function(activeTasks, sessionMem) {
    "use strict";

    describe("active tasks", function () {
        var sut;

        beforeEach(function () {
            activeTasks.reset();
//            return require.config({
//                context: "context_" + cnt,
//                map: {
//                  "*": map
//                },
//                baseUrl: 'js/cfe/app/'
//              });

        });

        it("after reset should return all letters", function () {
            var sessionTasks = {
                mems : ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
                findWorstLetter : function() {
                    return sessionMem.Letter(sessionTasks.mems.splice(0, 1)[0]);
                } 
            };
            
            activeTasks.restoreTaskPool(sessionTasks);
            
            var taskPool = activeTasks.getTaskPool();
            expect(taskPool.length).toEqual(4);
            expect(taskPool[0].letter).toEqual('a');
            expect(taskPool[1].letter).toEqual('b');
            expect(taskPool[2].letter).toEqual('c');
            expect(taskPool[3].letter).toEqual('d');
        });

        it("after checkRust should remain only badly learned mems", function () {
            var sessionTasks = {
                mems : ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
                findWorstLetter : function() {
                    return sessionMem.Letter(sessionTasks.mems.splice(0, 1)[0]);
                } 
            };
            activeTasks.restoreTaskPool(sessionTasks);
            var taskPool = activeTasks.getTaskPool();
            taskPool[0].hitsAfterLastMiss = 19;
            taskPool[1].hitsAfterLastMiss = 21;
            taskPool[2].hitsAfterLastMiss = 30;
            taskPool[3].hitsAfterLastMiss = 0;

            activeTasks.checkPoolRust();
            
            var taskPool = activeTasks.getTaskPool();
            expect(taskPool.length).toEqual(2);
            expect(taskPool[0].letter).toEqual('a');
            expect(taskPool[1].letter).toEqual('d');
        });
    });

    it("after second restore pool should have four mems again", function () {
            var sessionTasks = {
                mems : ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
                findWorstLetter : function() {
                    return sessionMem.Letter(sessionTasks.mems.splice(0, 1)[0]);
                } 
            };
            activeTasks.reset();
            activeTasks.restoreTaskPool(sessionTasks);
            var taskPool = activeTasks.getTaskPool();
            taskPool[0].hitsAfterLastMiss = 19;
            taskPool[1].hitsAfterLastMiss = 21;
            taskPool[2].hitsAfterLastMiss = 30;
            taskPool[3].hitsAfterLastMiss = 0;

            activeTasks.checkPoolRust();

            var taskPool = activeTasks.getTaskPool();
            expect(taskPool.length).toEqual(2);
            
            activeTasks.restoreTaskPool(sessionTasks);
            
            var taskPool2 = activeTasks.getTaskPool();
            expect(taskPool2.length).toEqual(4);
            expect(taskPool2[0].letter).toEqual('a');
            expect(taskPool2[1].letter).toEqual('d');
            expect(taskPool2[2].letter).toEqual('e');
            expect(taskPool2[3].letter).toEqual('f');
    });

    it("if not all mems are learnt should not extend poll size", function () {
            var sessionTasks = {
                mems : ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
                findWorstLetter : function() {
                    return sessionMem.Letter(sessionTasks.mems.splice(0, 1)[0]);
                } 
            };
            activeTasks.reset();
            activeTasks.restoreTaskPool(sessionTasks);
            var taskPool = activeTasks.getTaskPool();
            taskPool[0].hitsAfterLastMiss = 19;
            taskPool[1].hitsAfterLastMiss = 21;
            taskPool[2].hitsAfterLastMiss = 30;
            taskPool[3].hitsAfterLastMiss = 0;

            activeTasks.checkPoolExpansion();
            activeTasks.restoreTaskPool(sessionTasks);

            var taskPool = activeTasks.getTaskPool();

            var taskPool2 = activeTasks.getTaskPool();
            expect(taskPool2.length).toEqual(4);
            expect(taskPool2[0].letter).toEqual('a');
            expect(taskPool2[1].letter).toEqual('b');
            expect(taskPool2[2].letter).toEqual('c');
            expect(taskPool2[3].letter).toEqual('d');
    });

    it("if all mems are learnt should extend pool size", function () {
            var sessionTasks = {
                mems : ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
                findWorstLetter : function() {
                    return sessionMem.Letter(sessionTasks.mems.splice(0, 1)[0]);
                } 
            };
            activeTasks.reset();
            activeTasks.restoreTaskPool(sessionTasks);
            var taskPool = activeTasks.getTaskPool();
            taskPool[0].hitsAfterLastMiss = 19;
            taskPool[1].hitsAfterLastMiss = 21;
            taskPool[2].hitsAfterLastMiss = 30;
            taskPool[3].hitsAfterLastMiss = 11;

            activeTasks.checkPoolExpansion();
            activeTasks.restoreTaskPool(sessionTasks);

            var taskPool2 = activeTasks.getTaskPool();
            expect(taskPool2.length).toEqual(5);
            expect(taskPool2[0].letter).toEqual('a');
            expect(taskPool2[1].letter).toEqual('b');
            expect(taskPool2[2].letter).toEqual('c');
            expect(taskPool2[3].letter).toEqual('d');
            expect(taskPool2[4].letter).toEqual('e');
    });

    it("if all mems are learnt but pool size is big enough should not extend pool size", function () {
            var sessionTasks = {
                mems : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm' , 'n'],
                findWorstLetter : function() {
                    return sessionMem.Letter(sessionTasks.mems.splice(0, 1)[0]);
                } 
            };
            activeTasks.reset();
            activeTasks.restoreTaskPool(sessionTasks);
            var taskPool = activeTasks.getTaskPool();
            taskPool[0].hitsAfterLastMiss = 19;
            taskPool[1].hitsAfterLastMiss = 21;
            taskPool[2].hitsAfterLastMiss = 30;
            taskPool[3].hitsAfterLastMiss = 11;

            for (var i = 0; i < 6; i++) {
                activeTasks.checkPoolExpansion();
                activeTasks.restoreTaskPool(sessionTasks);
                var taskPool = activeTasks.getTaskPool();
                expect(taskPool.length).toEqual(5 + i);
                taskPool[taskPool.length - 1].hitsAfterLastMiss = 11;
            }
            expect(taskPool.length).toEqual(10);
            
            activeTasks.checkPoolExpansion();
            activeTasks.restoreTaskPool(sessionTasks);

            var taskPool2 = activeTasks.getTaskPool();
            expect(taskPool2.length).toEqual(10);
            expect(taskPool2[0].letter).toEqual('a');
            expect(taskPool2[1].letter).toEqual('b');
            expect(taskPool2[2].letter).toEqual('c');
            expect(taskPool2[3].letter).toEqual('d');
            expect(taskPool2[4].letter).toEqual('e');
            expect(taskPool2[5].letter).toEqual('f');
            expect(taskPool2[6].letter).toEqual('g');
            expect(taskPool2[7].letter).toEqual('h');
            expect(taskPool2[8].letter).toEqual('i');
            expect(taskPool2[9].letter).toEqual('j');
    });

    it("should generate random task", function () {
        var sessionTasks = {
            mems : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm' , 'n'],
            findWorstLetter : function() {
                return sessionMem.Letter(sessionTasks.mems.splice(0, 1)[0]);
            } 
        };
        activeTasks.reset();
        activeTasks.restoreTaskPool(sessionTasks);

        activeTasks.generateTask();
        var currentTask = activeTasks.getCurrentTask();
        var taskPool = activeTasks.getTaskPool();

        expect(taskPool.indexOf(currentTask)).toBeGreaterThan(-1);
    });

    it("should generate second random task that if=s different from tje prevoius one", function () {
        var sessionTasks = {
            mems : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm' , 'n'],
            findWorstLetter : function() {
                return sessionMem.Letter(sessionTasks.mems.splice(0, 1)[0]);
            } 
        };
        activeTasks.reset();
        activeTasks.restoreTaskPool(sessionTasks);

        activeTasks.generateTask();
        var currentTask = activeTasks.getCurrentTask();
        
        for (var i = 0; i < 100; i++) {
            activeTasks.generateTask();
            var nextTask = activeTasks.getCurrentTask();
            expect(nextTask === currentTask).toBeFalsy();
            currentTask = nextTask;
        }
    });

});


