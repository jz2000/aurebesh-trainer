define(['tasks'], function(tasks) {
    "use strict";

describe("tasks", function () {
    var sut;

    beforeEach(function () {
        
    });
    
    it("should return all letters", function () {
        expect(tasks.getAllTasks().length).toBeGreaterThan(0);
    });

//    it("should return only letters", function () {
//        expect(tasks.getAllTasks()).toBeArrayOfStrings();
//    });

});

});