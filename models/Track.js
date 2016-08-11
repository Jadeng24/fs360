var mongoose = require('mongoose')

var TrackSchema = new mongoose.Schema({
	visitor: {type:mongoose.Schema.Types.Mixed, default:{}},
	pageMap: {type:mongoose.Schema.Types.Mixed, default:{}},
	score: {type:Number, default:0},
	history: {type:Array, default:[]},
	timestamp: {type:Date, default:Date.now}
})

TrackSchema.methods.summary = function() {
	var summary = {
		'visitor':this.visitor,
		'pageMap':this.pageMap,
		'history':this.history,
		'score':this.score,
		'timestamp':this.timestamp,
		'id':this._id
	}
	return summary
}

module.exports = mongoose.model('TrackSchema', TrackSchema)