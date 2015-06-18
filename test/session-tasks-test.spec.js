define(['session-mem', 'session-tasks'], function(sessionMem, sessionTasks) {
    "use strict";

    describe("session tasks", function () {
        var sut;

        beforeEach(function () {
        });

        it("after reset should return all letters", function () {
            var mems = ['a', 'b', 'c'];
            sessionTasks.resetStatistics(mems);
            expect(sessionTasks.getSessionTasks().length).toEqual(mems.length);
        });

        it("after reset should return any of three letters as a worst letter", function () {
            var mems = ['a', 'b', 'c'];
            sessionTasks.resetStatistics(mems);
            var sessionMems = sessionTasks.getSessionTasks();
            var worstLetter = sessionTasks.findWorstLetter([sessionMems[1], sessionMems[2]]);
            expect(worstLetter.letter).toEqual(mems[0]);
        });

        it("after reset with one letter should return the letter as a worst letter", function () {
            var mems = ['a'];
            sessionTasks.resetStatistics(mems);
            var worstLetter = sessionTasks.findWorstLetter([]);
            expect(worstLetter.letter).toEqual(mems[0]);
        });

        it("after working with one letter should return the letter as a worst letter", function () {
            var mems = ['a'];
            sessionTasks.resetStatistics(mems);
            sessionTasks.getSessionTasks()[0].hitsAfterLastMiss = 20;
            var worstLetter = sessionTasks.findWorstLetter([]);
            expect(worstLetter.letter).toEqual(mems[0]);
        });

        it("after working with two letter should return the letter as a worst letter", function () {
            var mems = ['a', 'b'];
            sessionTasks.resetStatistics(mems);
            sessionTasks.getSessionTasks()[0].hitsAfterLastMiss = 20;
            sessionTasks.getSessionTasks()[1].hitsAfterLastMiss = 19;
            var worstLetter = sessionTasks.findWorstLetter([]);
            expect(worstLetter.letter).toEqual(mems[1]);
        });

        it("after working with four letter should return the letter as a worst letter", function () {
            var mems = ['a', 'b', 'c', 'd'];
            sessionTasks.resetStatistics(mems);
            sessionTasks.getSessionTasks()[0].hitsAfterLastMiss = 20;
            sessionTasks.getSessionTasks()[1].hitsAfterLastMiss = 10;
            sessionTasks.getSessionTasks()[2].hitsAfterLastMiss = 9;
            sessionTasks.getSessionTasks()[3].hitsAfterLastMiss = 19;
            var worstLetter = sessionTasks.findWorstLetter([]);
            expect(worstLetter.letter).toEqual(mems[2]);
        });

    //    it("should return only letters", function () {
    //        expect(tasks.getAllTasks()).toBeArrayOfStrings();
    //    });

    });

});