var express = require('express');
var router = express.Router();
var Profile = require('../models/Profile');
var Course = require('../models/Course');
var Project = require('../models/Project');
var Promise = require('bluebird');
var EmailManager = require('../managers/EmailManager');


function createProfile(profileInfo){
    return new Promise(function (resolve, reject){

		Profile.create(profileInfo, function(err, profile){
			if (err){
	            reject(err)
	            return
			}
		
			if (profile == null){
	            reject(null)
	            return
			}

	        resolve(profile)
		})
    })
}

function findProfile(params){
    return new Promise(function (resolve, reject){

    	if (params.id == null){
			Profile.find(params, function(err, profiles){
				if (err){
			        resolve(null)
		            return null
				}
			
		        resolve(profiles)
			})

			return
    	}

    	Profile.findById(params.id, function(err, profile){
			if (err){
		        reject({message:'Profile not found'})
	            return null
			}

			if (profile){
		        reject({message:'Profile not found'})
	            return null				
			}
		
	        resolve(profile)
    	})
    })
}

function findProject(projectId){
    return new Promise(function (resolve, reject){

		Project.findById(projectId, function(err, project){
			if (err){
	            reject(err)
	            return
			}
		
			if (project == null){
	            reject(null)
	            return
			}

	        resolve(project)
		})
    })
}

function findCourse(courseId){
    return new Promise(function (resolve, reject){

		Course.findById(courseId, function(err, course){
			if (err){
	            reject(err)
	            return
			}
		
			if (course == null){
	            reject(null)
	            return
			}

	        resolve(course)
		})
    })
}

function createStripeAccount(stripe, profile, stripeToken, amount){ // amount can be null
    return new Promise(function (resolve, reject){

		stripe.customers.create({
			description: profile.id,
			source: stripeToken
		}, function(err, customer) {
			if (err){
	            reject(err);
	            return; 
			}
			
			var card = customer.sources.data[0];
			profile['creditCard'] = {
				'id':customer.id,
				'lastFour':card.last4,
				'exp_month':card.exp_month,
				'exp_year':card.exp_year,
				'brand':card.brand
			};
			profile['stripeId'] = customer.id;
			profile.save();

			if (amount == null){
			    resolve(profile);
				return;
			}

	        // resolve(customer);
	        var cents = amount * 100;
			stripe.charges.create({
					amount: cents, // amount in cents, need to multiply by 100
					currency: 'usd',
					customer: customer.id,
					description: 'Example charge',
				}, function(error, charge) {
					if (error){ // check for `err`
			            reject(err);
			            return; 
					}

			        resolve(charge);
//					res.send({'confirmation':'success', 'charge':charge});
					return;
			});
		});
    });
}

function createStripeCharge(stripe, amount, customerId, description){
    return new Promise(function (resolve, reject){
		stripe.charges.create({
				amount: amount*100, // amount in cents
				currency: 'usd',
				customer: customerId,
				description: description,
			}, function(err, charge) {
				if (err){ // check for `err`
		            reject(err)
		            return
				}

		    	resolve(charge)
		})
    })
}

function createNonregisteredStripeCharge(stripe, stripeToken, amount, description){
    return new Promise(function (resolve, reject){
		stripe.charges.create({
				amount: amount*100, // amount in cents
				currency: 'usd',
				source: stripeToken,
				description: description,
			}, function(err, charge) {
				if (err){ // check for `err`
		            reject(err)
		            return
				}

		    	resolve(charge)
		})
    })
}


router.post('/:resource', function(req, res, next) {
	var resource = req.params.resource

	if (resource == 'register') { // new user signing up as premium subscriber
		createProfile(req.body)
		.then(function(profile){
			var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
			return createStripeAccount(stripe, profile, req.body.stripeToken, null)
		})
		.catch(function(err){
			res.send({'confirmation':'fail', 'message':err.message})
			return
		})
	}

	if (resource == 'charge') {
		var customerName = ''
		var customerEmail = req.body.email
		var prod = null

		var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
		createNonregisteredStripeCharge(stripe, req.body.stripeToken, req.body.amount, 'Velocity 360: '+req.body.description)
		.then(function(charge){
//			console.log('CHARGE: '+JSON.stringify(charge))
			var productId = req.body.product
			customerName = charge.source.name // this comes from Stripe
			if (req.body.type == 'project')
				return findProject(productId)
			
			if (req.body.type == 'course')
				return findCourse(productId)
		})
		.then(function(product){
			prod = product
			return findProfile({email:customerEmail})
		})
		.then(function(profiles){
			var text = customerName+' purchased '+prod.title
			EmailManager.sendEmails('info@thegridmedia.com', ['dkwon@velocity360.io'], 'Project Purchase', text)

			if (profiles.length > 0){ // registered user
				var profile = profiles[0]
				req.session.user = profile.id // login as user
				var subscribers = prod.subscribers
				if (subscribers.indexOf(profile.id) == -1){
					subscribers.push(profile.id)
					prod['subscribers'] = subscribers
					prod.save()
				}

				var response = {
					confirmation:'success',
					profile:profile.summary()
				}

				response[req.body.type] = prod.summary()
				res.send(response)
				return
			}

			// unregistered user, create account
			var parts = customerName.split(' ')
			var firstName = parts[0]
			var lastName = ''
			if (parts.length > 1)
				lastName = parts[parts.length-1]

			var profileInfo = {
				email: customerEmail,
				firstName: firstName,
				lastName: lastName,
				password: 'abcd'
			}

			Profile.create(profileInfo, function(err, profile){
				if (err){
					var response = {
						confirmation:'success',
						profile:profile.summary()
					}

					response[req.body.type] = prod.summary()
					res.send(response)
					return
				}

				var subscribers = prod.subscribers
				if (subscribers.indexOf(profile.id) == -1){
					subscribers.push(profile.id)
					prod['subscribers'] = subscribers
					prod.save()
				}

				// send new profile a welcome email
				req.session.user = profile.id // login as user

				var response = {
					confirmation:'success',
					profile:profile.summary()
				}

				response[req.body.type] = prod.summary()
				res.send(response)
				return
			})
		})
		.catch(function(err){
			console.log('CHARGE ERROR: '+err.message)
			res.send({'confirmation':'fail', 'message':err.message})
			return
		})
		
		return
	}


	// Apply a credit card to a profile:
	if (resource == 'card') {
		var stripeToken = req.body.stripeToken
		if (stripeToken == null){
			res.json({'confirmation':'fail', 'message':'Missing stripeToken parameter'})
			return
		}
		
		if (req.session == null){
			res.send({'confirmation':'fail', 'message':'User not logged in.'})
			return
		}

		if (req.session.user  == null){
			res.send({'confirmation':'fail', 'message':'User not logged in.'})
			return
		}
		
		var userId = req.session.user
		findProfile({id:userId})
		.then(function(profile){
			var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
			stripe.customers.create({
				description: profile.id,
				source: stripeToken
			}, function(err, customer) {
				if (err){
					res.json({'confirmation':'fail', 'message':err.message})
					return;
				}
				
				profile['accountType'] = 'premium'
				profile['monthlyRate'] = 19.99
				var promoCode = req.body.promoCode

				if (promoCode != null){ // check promo code
					profile['promoCode'] = promoCode
					if (promoCode == 'nyu'){
						profile['monthlyRate'] = 9.99
					}
				}

				res.json({'confirmation':'success', 'profile':profile.summary()})
				
				var card = customer.sources.data[0]
				profile['stripeId'] = customer.id
				profile['creditCard'] = {'id':customer.id, 'lastFour':card.last4, 'exp_month':card.exp_month, 'exp_year':card.exp_year, 'brand':card.brand}

				EmailManager.sendEmail('info@thegridmedia.com', 'dkwon@velocity360.io', 'New Premium Subscriber', JSON.stringify(profile.summary()))
				profile.save()
				return
			})
		})
		.catch(function(err){
			res.send({'confirmation':'fail', 'message':err.message})
		})

		return
	}
	
	
})


module.exports = router
