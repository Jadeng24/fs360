var mongoose = require('mongoose')

var SampleSchema = new mongoose.Schema({
	profile: {type:String, trim:true, default:''},
	title: {type:String, trim:true, default:''},
	topic: {type:String, trim:true, lowercase:true, default:'ios'}, // ios, node, react, etc
	image: {type:String, trim:true, default:''},
	url: {type:String, trim:true, default:''},
	isPublic: {type:String, trim:true, default:'yes'},
	video: {type:String, trim:true, default:''},
	description: {type:String, default:''},
	slug: {type:String, trim:true, lowercase:true, default:''},
	tags: {type:Array, default:[]},
	timestamp: {type:Date, default: Date.now}
})

SampleSchema.methods.summary = function() {
	var summary = {
		'profile':this.profileitle,
		'title':this.title,
		'topic':this.topic,
		'image':this.image,
		'url':this.url,
		'isPublic':this.isPublic,
		'video':this.video,
		'description':this.description,
		'slug':this.slug,
		'tags':this.tags,
		'timestamp':this.timestamp,
		'id':this._id
	};
	return summary;
};

module.exports = mongoose.model('SampleSchema', SampleSchema)