var express = require('express')
var router = express.Router()

var accountController = require('../controllers/AccountController')
var courseController = require('../controllers/CourseController')
var postController = require('../controllers/PostController')
var eventController = require('../controllers/EventController')
var controllers = {
	courses: courseController,
	course: courseController,
	feed: postController,
	events: eventController,
}

require('node-jsx').install({ extension: ".js" })
var React = require('react')
var ReactDOMServer = require('react-dom/server')

// React:
var ServerApp = require('../public/build/es5/ServerApp')
var store = require('../public/build/es5/stores/store')
var initial = require('../public/build/es5/reducers/initial') // default values for all reducesrs


router.get('/', function(req, res, next) {
	var initialData = initial()

	accountController.checkCurrentUser(req, function(err, currentUser){
		if (err){

		}

		if (currentUser != null)
			initialData.profileReducer.currentUser = currentUser

		var initialState = store.configureStore(initialData).getState()
		var element = React.createElement(ServerApp, {page:'home', initial:initialState})
		res.render('index', {react: ReactDOMServer.renderToString(element), preloadedState:JSON.stringify(initialState)})		
	})
})


router.get('/:page', function(req, res, next) {
	var initialData = initial()
	var page = req.params.page // 'courses', 'feed', 'account'

	accountController.checkCurrentUser(req, function(err, currentUser){
		if (err){

		}

		if (currentUser != null){
			initialData.profileReducer.currentUser = currentUser
			if (page == 'account'){ // special route - go to account page
				var initialState = store.configureStore(initialData).getState()
				var element = React.createElement(ServerApp, {page:page, params:req.query, initial:initialState})
				res.render(page, {react: ReactDOMServer.renderToString(element), preloadedState:JSON.stringify(initialState)})
				return
			}
		}

		var controller = controllers[page]
		if (controller == null){
			// TODO: handle error
			return
		}

		controller.get(req.query, function(err, results){
			if (err){

			}

			if (results){
				if (page == 'courses')
					initialData.courseReducer.courseArray = results

				if (page == 'feed')
					initialData.postReducer.postsArray = results
			}

			var initialState = store.configureStore(initialData).getState()
			var element = React.createElement(ServerApp, {page:page, params:req.query, initial:initialState})
			res.render(page, {react: ReactDOMServer.renderToString(element), preloadedState:JSON.stringify(initialState)})
		})

	})

})

// router.get('/:page', function(req, res, next) {
// 	var page = req.params.page

// 	var controller = controllers[page]
// 	if (controller == null){
// 	    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page:page, params:req.query, headers:req.headers}))
// 	    res.render(page, {react:html})
// 		return
// 	}

// 	controller.get({}, function(err, results){
// 		if (err){

// 		}

// 		if (results.length == 0){
// 		    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page:page, slug:slug, headers:req.headers}));
// 		    res.render(page, {react:html, tags:{}});
// 			return
// 		}

// 		var entity = results[results.length-1]
// 		var desc = (entity.description == null) ? entity.text : entity.description
// 		if (desc.length > 200)
// 			desc = desc.substring(0, 200)+'...'
		
// 		var fbTags = {
// 			title: entity.title,
// 			description: desc,
// 			url: 'https://www.velocity360.io/'+page,
// 			image: 'https://media-service.appspot.com/site/images/'+entity.image+'?crop=260'
// 		}

// 	    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page:page, params:req.query, headers:req.headers}));
// 	    res.render(page, {react:html, tags:fbTags});
// 		return
// 	})
// })

router.get('/:page/:slug', function(req, res, next) {
	var page = req.params.page
	if (page == 'api' || page == 'admin' || page == 'account'){
		next()
		return
	}

	var slug = req.params.slug
	var controller = controllers[page]
	if (controller == null){
	    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page: page, slug:slug}))
	    res.render(page, {react: html})
		return
	}

	controller.get({slug: slug}, function(err, results){
		if (err){

		}

		if (results.length == 0){
		    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page:page, slug:slug}))
		    res.render(page, {react:html, tags:{}})
			return
		}

		var entity = results[0]
		var desc = (entity.description == null) ? entity.text : entity.description
		if (desc.length > 200)
			desc = desc.substring(0, 200)+'...'
		
		var fbTags = {
			title: entity.title,
			description: desc,
			url: 'https://www.velocity360.io/'+page+'/'+slug,
			image: 'https://media-service.appspot.com/site/images/'+entity.image+'?crop=260'
		}

	    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page:page, slug:slug}));
	    res.render(page, {react:html, tags:fbTags})
		return
	})

})

module.exports = router
