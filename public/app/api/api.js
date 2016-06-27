import superagent from 'superagent'
import actions from '../actions/actions'
import store from '../stores/store'
//import fetch from 'isomorphic-fetch'

export default {

	handleGet: function(endpoint, params, completion){
		superagent
		.get(endpoint)
		.query(params)
		.set('Accept', 'application/json')
		.end(function(err, res){
			if (completion == null)
				return

			if (err){ 
				completion(err, null)
				return
			}

			if (res.body.confirmation == 'success')
	    		completion(null, res.body)
			else 
	    		completion({message:res.body.message}, null)
		})

		// fetch(endpoint, {
		//     method: 'GET',
		//     headers: {
		//         'Accept': 'application/json',
		//         'Content-Type': 'application/json'
		//     },
		// })
		// .then(response => response.json())
		// .then(function(json){
	 //    	if (completion != null){
	 //    		if (json.confirmation == 'success')
		//     		completion(null, json)
	 //    		else
		//     		completion({message: json.message}, null)
	 //    	}
		// })
		// .catch(function(err){
	 //    	if (completion != null)
	 //    		completion(err, null)

		// })
	},

	// using superagent here because for some reason, cookies don't get installed using fetch (wtf)
	handlePost: function(endpoint, body, completion){
		superagent
		.post(endpoint)
		.send(body)
		.set('Accept', 'application/json')
		.end(function(err, res){
			if (completion == null)
				return

			if (err){ 
				completion(err, null)
				return
			}
			
			if (res.body.confirmation == 'success')
	    		completion(null, res.body)
			else 
	    		completion({message:res.body.message}, null)
		})
	},

	handlePut: function(endpoint, body, completion){
		superagent
		.put(endpoint)
		.send(body)
		.set('Accept', 'application/json')
		.end(function(err, res){
			if (completion == null)
				return

			if (err){ 
				completion(err, null)
				return
			}
			
			if (res.body.confirmation == 'success')
	    		completion(null, res.body)
			else 
	    		completion({message:res.body.message}, null)
		})
	},


	upload: function(file, completion){
		var _file = file
		this.handleGet('https://media-service.appspot.com/api/upload', null, function(err, response){
			if (err){
				return
			}

	        var uploadRequest = superagent.post(response.upload);
	        uploadRequest.attach('file', _file);
	        uploadRequest.end(function(err, resp){
	        	if (err){
			      	console.log('UPLOAD ERROR: '+JSON.stringify(err));
					completion(err, null)
	              	return;
	        	}

		      	var image = resp.body.image;
				completion(null, image)
	        });


		})
	},

	submitStripeToken: function(token, completion){
        var http = new XMLHttpRequest();
        var url = "/stripe/card";
        var params = "stripeToken="+token.id;
        http.open("POST", url, true);
        
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        // notice that the event handler is on xhr and not xhr.upload
        http.addEventListener('readystatechange', function(e) {
            if( this.readyState === 4 ) { // the transfer has completed and the server closed the connection.
                console.log('UPLOAD COMPLETE: ');

                if (completion != null)
	                completion()

            }
        });
  
        var response = http.send(params);
//        console.log('RESPONSE: '+response);
	},

	submitStripeCharge: function(token, courseId, amt, completion){
        var http = new XMLHttpRequest();
        var url = '/stripe/charge';
        var params = "stripeToken="+token.id+"&course="+courseId+"&amount="+amt;
        http.open("POST", url, true);
        
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        // notice that the event handler is on xhr and not xhr.upload
        http.addEventListener('readystatechange', function(e) {
            if( this.readyState === 4 ) { // the transfer has completed and the server closed the connection.
                console.log('UPLOAD COMPLETE: ');

                if (completion != null)
	                completion()
            }
        });
  
        var response = http.send(params);
//        console.log('RESPONSE: '+response);
	}



}