import React, {Component} from 'react'

class Application extends Component {

	constructor(props, context){
		super(props, context)
		this.updateApplication = this.updateApplication.bind(this)
		this.submitApplication = this.submitApplication.bind(this)
		this.state = {
			application: {
				name: '',
				email: '',
				phone: '',
				course: '',
				goal: '',
				history: '',
				linkedin: '',
				github:'',
				college:'',
				major:'',
				currentLevel:'total beginner',
				subject: 'Course Application',
				confirmation: 'Thank you for completing an application. We will reach out to you shortly to schedule a phone call.'
			}
		}
	}

	updateApplication(event){
//		console.log('updateUserApplication: '+event.target.id)
		event.preventDefault()


		var updatedApplication = Object.assign({}, this.state.application)
		updatedApplication[event.target.id] = event.target.value
		this.setState({
			application: updatedApplication
		})
	}


	submitApplication(event){
		event.preventDefault()
		var application = Object.assign({}, this.state.application)
		var required = [
			{field:'name', message:'Please enter your name'},
			{field:'email', message:'Please enter your email'},
			{field:'phone', message:'Please enter your phone number'},
			{field:'goal', message:'Please answer all questions.'}
		]

		var missing = null
		for (var i=0; i<required.length; i++){
			var prop = required[i]
			var value = application[prop.field]
			if (value.length == 0){
				missing = prop
				break
			}
		}

		if (missing != null){
			alert(missing.message)
			return
		}

		this.props.onSubmit(application)
	}


	render(){

		return (
			<section id="content" style={{background:'#fff', borderTop:'1px solid #ddd'}}>
				<div id="application" className="content-wrap">
					<div className="container clearfix">

						<div className="postcontent overview nobottommargin">
							<h2 style={{marginTop:0}}>Application</h2>
							<hr />

							<div className="contact-widget">

								<div className="contact-form-result"></div>

								<form className="nobottommargin" id="template-contactform" name="template-contactform" action="" method="post">
									<div className="form-process"></div>
									<div className="col_full">
										<label for="template-contactform-name">Name</label>
										<input type="text" onChange={this.updateApplication} id="name" value={this.state.application.name} name="template-contactform-name" style={{background:'#FEF9E7'}} className="custom-input" />
									</div>

									<div className="col_full">
										<label for="template-contactform-email">Email</label>
										<input type="email" onChange={this.updateApplication} id="email" value={this.state.application.email} name="template-contactform-email" style={{background:'#FEF9E7'}} className="custom-input" />
									</div>

									<div className="col_full">
										<label for="template-contactform-phone">Phone</label>
										<input type="text" onChange={this.updateApplication} id="phone" value={this.state.application.phone} name="template-contactform-phone" style={{background:'#FEF9E7'}} className="custom-input" />
									</div>

									<div className="clear"></div>

									<div className="col_full">
										<label for="template-contactform-message">What is your goal in technology for the next 6 to 12 months?</label>
										<textarea onChange={this.updateApplication} value={this.state.application.goal} className="custom-input" style={{background:'#FEF9E7'}} id="goal" name="template-contactform-message" rows="6" cols="30"></textarea>
									</div>

									<div className="col_full">
										<label>GitHub</label>
										<input type="text" onChange={this.updateApplication} id="github" value={this.state.application.github} style={{background:'#FEF9E7'}} className="custom-input" />
									</div>

									<div className="col_full">
										<label>LinkedIn</label>
										<input type="text" onChange={this.updateApplication} id="linkedin" value={this.state.application.linkedin} style={{background:'#FEF9E7'}} className="custom-input" />
									</div>

									<div className="col_full hidden">
										<input type="text" id="template-contactform-botcheck" name="template-contactform-botcheck" value="" style={{background:'#FEF9E7'}} className="custom-input" />
									</div>

									<div className="col_full">
										<label for="template-contactform-subject">Current Level</label>
										<select onChange={this.updateApplication} value={this.state.application.currentLevel} id="currentLevel" className="form-control input-lg not-dark">
											<option value="total beginner">Total beginner - Never coded before</option>
											<option value="getting there">Getting There - A couple online tutorials</option>
											<option value="intermediate">Intermediate - Can build a few projects on my own</option>
											<option value="advanced">Advanced - Professional, looking to learn new skills</option>
										</select>
									</div>

									<div className="col_full">
										<label>Undergraduate College</label>
										<input type="text" onChange={this.updateApplication} id="college" value={this.state.application.college} style={{background:'#FEF9E7'}} className="custom-input" />
									</div>

									<div className="col_full">
										<label>Undergraduate Major</label>
										<input type="text" onChange={this.updateApplication} id="major" value={this.state.application.major} style={{background:'#FEF9E7'}} className="custom-input" />
									</div>

									<div className="col_full">
										<a onClick={this.submitApplication} href="#" className="button button-border button-dark button-rounded noleftmargin">Submit Application</a>
									</div>
								</form>

							</div>

						</div>
					</div>
				</div>
			</section>

		)
	}

}


export default Application

