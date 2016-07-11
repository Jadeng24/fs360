var mongoose = require('mongoose');


var PostSchema = new mongoose.Schema({
	text: {type:String, trim:true, default: ''},
	title: {type:String, trim:true, default: ''},
	image: {type:String, trim:true, default: 'y_I3PXcQ'}, // green logo
	wistia: {type:String, trim:true, default: ''},
	slug: {type:String, lowercase:true, trim:true, default:''},
	link: {type:String, trim:true, lowercase:true, default:''},
	profile: {type:mongoose.Schema.Types.Mixed, default:{}},
	numReplies: {type:Number, default:0},
	isPublic: {type:String, trim:true, default:'yes'},
	thread: {type:String, default:'' },
	timestamp: {type:Date, default:Date.now},
});


PostSchema.methods.summary = function() {
	var summary = {
		'title':this.title,
		'image':this.image,
		'wistia':this.wistia,
		'profile':this.profile,
		'text':this.text,
		'slug':this.slug,
		'isPublic':this.isPublic,
		'numReplies':this.numReplies,
		'link':this.link,
		'thread':this.thread,
		'timestamp':this.timestamp,
		'id':this._id
	};
	return summary;
};





module.exports = mongoose.model('PostSchema', PostSchema);