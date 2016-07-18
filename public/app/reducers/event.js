var constants = require('../constants/constants')

var initialState = {
	events: { },
	eventArray: []
}


export default function(state = initialState, action){
	switch (action.type) {

		case constants.EVENTS_RECIEVED:
			var newState = Object.assign({}, state)
			var c = action.events
			newState['eventArray'] = c
			var eventMap = {}
			for (var i=0; i<c.length; i++){
				var event = c[i]
				eventMap[event.slug] = event
			}

			newState['events'] = eventMap
//			console.log('COURSE REDUCER - COURSES_RECIEVED: '+JSON.stringify(newState));
			return newState

		default:
			return state
	}

}