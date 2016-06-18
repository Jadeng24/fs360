import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import { connect } from 'react-redux'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import CourseSection from '../../components/CourseSection'
import store from '../../stores/store'
import actions from '../../actions/actions'
import stripe from '../../utils/StripeUtils'
import api from '../../api/api'

class Course extends Component {

	constructor(props, context){
		super(props, context)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.showLogin = this.showLogin.bind(this)
		this.login = this.login.bind(this)
		this.updateLogin = this.updateLogin.bind(this)
		this.openStripeModal = this.openStripeModal.bind(this)
		this.updateSyllabusRequest = this.updateSyllabusRequest.bind(this)
		this.updateApplication = this.updateApplication.bind(this)
		this.submitApplication = this.submitApplication.bind(this)
		this.syllabusRequest = this.syllabusRequest.bind(this)
		this.state = {
			showLoader: false,
			showModal: false,
			showLogin: false,
			showConfirmation: false,
			syllabusRequest: {
				name: '',
				email: '',
				course: ''
			},
			application: {
				name: '',
				email: '',
				phone: '',
				course: 'ios and node bootcamp',
				goal: '',
				history: '',
				linkedin: '',
				github:'',
				college:'',
				major:'',
				currentLevel:'total beginner'
			}			
		}
	}

	componentDidMount(){
		var _this = this
		api.handleGet('/api/course?slug='+this.props.slug, {}, function(err, response){
			if (err){
				alert(response.message)
				return
			}

			var course = response.courses[0]
			if (course.type == 'online'){ // for videos, show subscription prompt:
				stripe.initialize(function(token){
					_this.setState({showLoader: true})
					api.submitStripeToken(token, function(){
						api.handleGet('/account/currentuser', {}, function(err, response){
							_this.setState({showLoader: false})
							if (err){
								alert(response.message)
								return
							}

							store.dispatch(actions.currentUserRecieved(response.profile))
						});
					})
				})
			}
			else {
				stripe.initializeWithText('Submit Deposit', function(token){
					_this.setState({showLoader: true})
					
					api.submitStripeCharge(token, _this.props.course.id, _this.props.course.deposit, function(){
						api.handleGet('/account/currentuser', {}, function(err, response){
							_this.setState({
								showConfirmation: true,
								showLoader: false
							})

						});
					})
				})
			}

			store.dispatch(actions.coursesRecieved(response.courses))
		})
	}

	openModal(event){
//		console.log('OPEN MODAL')
		event.preventDefault()
		this.setState({showModal: true})
	}

	updateSyllabusRequest(event){
		var s = Object.assign({}, this.state.syllabusRequest)
		s[event.target.id] = event.target.value
		s['course'] = this.props.course.title
		this.setState({
			syllabusRequest: s
		})

	}

	syllabusRequest(event){
		event.preventDefault()

		this.setState({
			showModal: false,
			showLoader: true
		});

		var _this = this
		api.handlePost('/api/syllabus', _this.state.syllabusRequest, function(err, response){
			_this.setState({
				showLoader: false
			});

			if (err){
				alert(err.message)
				return
			}

			alert(response.message)
		});
	}	

	closeModal(){
		this.setState({
			showModal: false,
			showLogin: false,
			showConfirmation: false
		})
	}

	showLogin(event){
		event.preventDefault()
		this.setState({showLogin: true})
	}

	updateLogin(event){
		event.preventDefault()

		var updatedUser = Object.assign({}, this.props.currentUser);
		updatedUser[event.target.id] = event.target.value
		store.dispatch(actions.updateCurrentUser(updatedUser));
	}

	login(event){
		event.preventDefault()
		this.setState({
			showModal: false,
			showLogin: false,
			showLoader: true
		})

		var _this = this
		api.handlePost('/account/login', this.props.currentUser, function(err, response){
			_this.setState({
				showLoader: false
			})

			if (err){
				alert(err.message)
				return
			}

			store.dispatch(actions.currentUserRecieved(response.profile));
		});
	}

	openStripeModal(event){
		event.preventDefault()
		if (this.props.course.type == 'online')
			stripe.showModal()
		else 
			stripe.showModalWithText(this.props.course.title)
	}

	updateApplication(event){
		console.log('updateUserApplication: '+event.target.id)
		event.preventDefault()


		var updatedApplication = Object.assign({}, this.state.application)
		updatedApplication[event.target.id] = event.target.value
		this.setState({
			application: updatedApplication
		})
	}


	submitApplication(event){
		event.preventDefault()
		console.log('submitApplication: '+JSON.stringify(this.state.application))

		this.setState({
			showLoader: true
		})

		var _this = this
		api.handlePost('/api/application', this.state.application, function(err, response){
//			console.log('RESPONSE: '+JSON.stringify(response));
			_this.setState({
				showLoader: false
			})

			if (err){
				alert(err.message)
				return
			}

			alert(response.message)
		})
	}	

	render(){
		var bannerIndex = 0;
		var btnRegister = null
		if (this.props.course.type == 'online'){
			bannerIndex = 1;
			btnRegister = <a onClick={this.openStripeModal} style={{marginRight:12}} href="#" className="button button-border button-dark button-rounded noleftmargin">Register</a>
		}
		else if (this.props.course.type == 'immersive'){
			bannerIndex = 2;
			btnRegister = <a style={{marginRight:12}} href="/application" className="button button-border button-dark button-rounded noleftmargin">Apply</a>
		}
		else {
			btnRegister = <a onClick={this.openStripeModal} style={{marginRight:12}} href="#" className="button button-border button-dark button-rounded noleftmargin">Register</a>
		}

		var banner = this.props.banners[bannerIndex]

		var startDate = (this.props.course.dates == null) ? '' : this.props.course.dates.split('-')[0].trim()
		var detailBox = null
		if (this.props.course.type != 'online'){
			detailBox =	<div className="col_half panel panel-default col_last">
							<div style={{backgroundColor:'#f1f9f5'}} className="panel-heading">Details</div>
							<div className="panel-body">
								{this.props.course.dates}<br />
								{this.props.course.schedule}<br />
								Tuition: ${this.props.course.tuition}<br />
								Deposit: ${this.props.course.deposit}
								<hr />
								{ btnRegister }
								<a onClick={this.openModal} href="#" className="button button-border button-dark button-rounded noleftmargin">Request Syllabus</a>
							</div>
						</div>
		}


		var _course = this.props.course
		var _accountType = this.props.currentUser.accountType
		var _showLogin = this.showLogin
		var _openStripeModal = this.openStripeModal
		var units = this.props.course.units.map(function(unit, i){
			return <CourseSection key={unit.index} subscribeAction={_openStripeModal} loginAction={_showLogin} unit={unit} course={_course} accountType={_accountType} />
		})

		return (
			<div>
				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
				<Sidebar />

				<section id="content" style={{backgroundColor: '#F5F5F5'}}>

					<div className="content-wrap">
						<div className="container clearfix">
							<div className="postcontent nobottommargin col_last clearfix">
								<div id="posts" className="post-timeline clearfix">
									<div className="timeline-border"></div>

									<div className="entry clearfix">
										<div className="entry-timeline">
											Intro<span></span>
											<div className="timeline-divider"></div>
										</div>
										<div className="entry-image">
											<img style={{background:'#fff', padding:6, border:'1px solid #ddd'}} className="image_fade" src={'/images/'+banner} alt="FullStack 360" />
										</div>
										<div className="entry-content">
											<div className="col_half">
												<h2 style={{marginBottom:0}}>{this.props.course.title}</h2>
												<p>{this.props.course.description}</p>
											</div>

											{ detailBox }

										</div>
									</div>

									{units}

								</div>
							</div>

						</div>
					</div>
				</section>

				<section id="content" style={{backgroundColor: '#fff', paddingBottom:0}}>
					<div className="row common-height clearfix" style={{background:'#fff', border:'1px solid #ddd'}}>
						<div className="col-sm-8 col-padding">
							<div>
								<div className="heading-block">
									<h3>Prepare for Tomorrow</h3>
								</div>

								<div className="row clearfix">
									<div className="col-md-10">
										<p>
											Our Mission is to teach you tomorrow’s technology, today.  If you want to work for a leading tech firm, for a technology startup, or become an entrepreneur, our classes will put you on the right track to achieve these goals.  This iOS class is based entirely on Swift language, which is the main language you will need to know while developing the majority of iOS app.  In our iOS class you will not be learning how to program games, however you will be able to learn how to develop social media applications similar to Snapchat and Instagram.
										</p>
										<p>
											Even if you do not want to become a professional developer and have it become your lifelong career, learning how an iOS app developed will give you the edge both in the immediate and distant future.  It might be a cliché, but learning how to code will empower you to act on future ideas.  For example if you are sitting in class one day and think of the next great social media app, it doesn’t have to just be a pipe dream or something that you would have to rely on someone else to build, it could be a project that you start building right away.
										</p>
										<a target="_blank" href="https://www.facebook.com/FullStack-360-1631852427085987/" className="social-icon inline-block si-small si-light si-rounded si-facebook">
											<i className="icon-facebook"></i>
											<i className="icon-facebook"></i>
										</a>
										<a target="_blank" href="https://twitter.com/fullstack360" className="social-icon inline-block si-small si-light si-rounded si-twitter">
											<i className="icon-twitter"></i>
											<i className="icon-twitter"></i>
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-sm-4 col-padding" style={{background: "url('/images/kids.jpg') center center no-repeat", backgroundSize: 'cover'}}></div>
					</div>
				</section>

				<section id="content" style={{background:'#f9f9f9'}}>
					<div className="content-wrap">
						<div className="container clearfix">

							<div className="postcontent bothsidebar nobottommargin">
								<h3>Apply</h3>
								<hr />

								<div className="contact-widget">

									<div className="contact-form-result"></div>

									<form className="nobottommargin" id="template-contactform" name="template-contactform" action="" method="post">
										<div className="form-process"></div>
										<div className="col_full">
											<label for="template-contactform-name">Name</label>
											<input type="text" onChange={this.updateApplication} id="name" value={this.state.application.name} name="template-contactform-name" className="sm-form-control required" />
										</div>

										<div className="col_full">
											<label for="template-contactform-email">Email</label>
											<input type="email" onChange={this.updateApplication} id="email" value={this.state.application.email} name="template-contactform-email" className="required email sm-form-control" />
										</div>

										<div className="col_full">
											<label for="template-contactform-phone">Phone</label>
											<input type="text" onChange={this.updateApplication} id="phone" value={this.state.application.phone} name="template-contactform-phone" className="sm-form-control" />
										</div>

										<div className="clear"></div>

										<div className="col_full">
											<label for="template-contactform-message">What is your goal in technology for the next 6 to 12 months?</label>
											<textarea onChange={this.updateApplication} value={this.state.application.goal} className="required sm-form-control" id="goal" name="template-contactform-message" rows="6" cols="30"></textarea>
										</div>

										<div className="col_full">
											<label>GitHub</label>
											<input type="text" onChange={this.updateApplication} id="github" value={this.state.application.github} className="sm-form-control" />
										</div>

										<div className="col_full">
											<label>LinkedIn</label>
											<input type="text" onChange={this.updateApplication} id="linkedin" value={this.state.application.linkedin} className="sm-form-control" />
										</div>

										<div className="col_full hidden">
											<input type="text" id="template-contactform-botcheck" name="template-contactform-botcheck" value="" className="sm-form-control" />
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
											<input type="text" onChange={this.updateApplication} id="college" value={this.state.application.college} className="sm-form-control" />
										</div>

										<div className="col_full">
											<label>Undergraduate Major</label>
											<input type="text" onChange={this.updateApplication} id="major" value={this.state.application.major} className="sm-form-control" />
										</div>

										<div className="col_full">
											<a onClick={this.submitApplication} href="#" className="button button-border button-dark button-rounded noleftmargin">Apply</a>
										</div>
									</form>

								</div>

							</div>
						</div>
					</div>

				</section>


		        <Modal show={this.state.showLogin} onHide={this.closeModal}>
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h2>Login</h2>
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24}}>
			        	<input onChange={this.updateLogin} value={this.props.currentUser.email} className="form-control" type="text" id="email" placeholder="Email" /><br />
			        	<input onChange={this.updateLogin} value={this.props.currentUser.password} className="form-control" type="password" id="password" placeholder="Password" /><br />
			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a onClick={this.login} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Log In</a>
			        </Modal.Footer>
		        </Modal>


		        <Modal show={this.state.showModal} onHide={this.closeModal}>
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h2>Request Syllabus</h2>
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24}}>
			        	<input onChange={this.updateSyllabusRequest} value={this.state.syllabusRequest.name} className="form-control" type="text" id="name" placeholder="Name" /><br />
			        	<input onChange={this.updateSyllabusRequest} value={this.state.syllabusRequest.email} className="form-control" type="text" id="email" placeholder="Email" /><br />

			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a onClick={this.syllabusRequest} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Submit</a>
			        </Modal.Footer>
		        </Modal>

		        <Modal show={this.state.showConfirmation} onHide={this.closeModal}>
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h2>Deposit Confirmed</h2>
			        	<img style={{width:120, borderRadius:60}} src="/images/logo_round_blue_260.png" />
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24, textAlign:'center'}}>
			        	<p>
			        		Thank you for submitting a deposit to the {this.props.course.title}. We look forward
			        		to meeting you on {startDate}. If you have any questions or concerns, feel
			        		free to contact us at katrina@velocity360.io. Thank you.
			        	</p>
			        </Modal.Body>
			        <Modal.Footer style={{textAlign:'center'}}>
						<a onClick={this.closeModal} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">OK</a>
			        </Modal.Footer>
		        </Modal>

				<Footer />
			</div>
		)
	}
}

const stateToProps = function(state) {
	var keys = Object.keys(state.courseReducer.courses)
//	console.log('STATE TO PROPS: '+JSON.stringify(state))

    return {
        currentUser: state.profileReducer.currentUser,
        course: state.courseReducer.courses[keys[0]],
        testimonials: state.staticReducer.testimonials,
//        faq: state.staticReducer.faq,
        loaderOptions: state.staticReducer.loaderConfig,
        banners: state.staticReducer.banners
    }
}


export default connect(stateToProps)(Course)