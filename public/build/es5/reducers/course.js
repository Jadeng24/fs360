"use strict";

var constants = require("../constants/constants");

var initialState = {
	courses: {}
};

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.heroes data.
See `initialstate.js` for a clear view of what it looks like!
*/

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	switch (action.type) {

		case constants.COURSES_RECIEVED:
			var newState = Object.assign({}, state);
			var c = action.courses;
			var courseMap = {};
			for (var i = 0; i < c.length; i++) {
				var course = c[i];
				courseMap[course.id] = course;
			}

			newState.courses = courseMap;
			console.log("COURSE REDUCER - COURSES_RECIEVED: " + JSON.stringify(newState));
			return newState;

		default:
			return state;
	}
};