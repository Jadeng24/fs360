import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import CourseSection from '../../components/CourseSection'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import api from '../../api/api'

class Course extends Component {

	constructor(props, context){
		super(props, context)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.state = {
			showLoader: false,
			showModal: false,
		}
	}

	componentWillMount(){

	}

	componentDidMount(){
		api.handleGet('/api/course?slug='+this.props.slug, {}, function(err, response){
			if (err){
				alert(response.message)
				return
			}

			store.dispatch(actions.coursesRecieved(response.courses))
		})
	}

	openModal(event){
		event.preventDefault()
		this.setState({showModal: true})
	}

	closeModal(){
		this.setState({showModal: false})
	}


	render(){
		var _course = this.props.course
		var units = this.props.course.units.map(function(unit, i){
			return <CourseSection key={unit.index} unit={unit} course={_course} />
		})

		var questions = null;
		if (this.props.slug=='ios-high-school-course' || this.props.slug=='web-high-school-course'){
			// console.log('IOS HIGH SCHOOL COURSE');
			questions = this.props.faq.highschool
		}
		else {
			questions = this.props.faq.general
		}

		var faq = questions.map(function(qa, i){
			return (
				<div>
					<h4><strong>Q.</strong> {qa.question}</h4>
					<p dangerouslySetInnerHTML={{__html: qa.answer}}></p>
					<div className="line"></div>
				</div>
			)
		});

		var random = Math.floor(Math.random() * (this.props.banners.length));
		var banner = this.props.banners[random];

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
											<img className="image_fade" src={'/images/'+banner} alt="FullStack 360" />
										</div>
										<div className="entry-content">
											<div className="col_half">
												<h2 style={{marginBottom:0}}>{this.props.course.title}</h2>
												<p>{this.props.course.description}</p>
											</div>

											<div className="col_half panel panel-default col_last">
												<div style={{backgroundColor:'#f1f9f5'}} className="panel-heading">Details</div>
												<div className="panel-body">
													{this.props.course.dates}<br />
													{this.props.course.schedule}<br />
													Tuition: ${this.props.course.tuition}<br />
													Depost: ${this.props.course.deposit}
													<hr />
													{ (this.props.course.type == 'immersive') ? <a href="/application" style={{marginRight:12}} className="button button-border button-dark button-rounded noleftmargin">Apply</a> : null }
													<a href="#" onClick={this.openModal} className="button button-border button-dark button-rounded noleftmargin">Request Syllabus</a>
												</div>
											</div>
										</div>
									</div>

									{units}


									<div className="entry clearfix">
										<div className="entry-timeline">
											Unit<span>!</span>
											<div className="timeline-divider"></div>
										</div>
										<div className="entry-image">
											<div className="panel panel-default">
												<div className="panel-body" style={{padding:36}}>
													<h2>Sign Up</h2>
													<hr />
													Ready to take the plunge? Need more information? Request a syllabus below or begin the application process.
													<br /><br />
													{ (this.props.course.type == 'immersive') ? <a href="/application" style={{marginRight:12}} className="button button-border button-dark button-rounded noleftmargin">Apply</a> : null }
													<a onClick={this.openModal} href="#" className="button button-border button-dark button-rounded noleftmargin">Request Syllabus</a>												
												</div>
											</div>
										</div>
									</div>

								</div>
							</div>

						</div>


					</div>

				</section>

				<section id="content" style={{backgroundColor: '#fff', paddingBottom:48}}>
					<div className="row common-height clearfix" style={{background:'#fff', border:'1px solid #ddd'}}>
						<div className="col-sm-8 col-padding">
							<div>
								<div className="heading-block">
									<h3>Prepare for Tomorrow</h3>
								</div>

								<div className="row clearfix">
									<div className="col-md-10">
										<p>
											Our Mission is to teach you tomorrow’s technology, today.  If you want to work for a leading tech firm, for a technology startup, or become an entrepreneur, this 2-week class will put you on the right track to achieve any of these goals.  This iOS class is based entirely on Swift language, which is the main language you will need to know while developing the majority of iOS app.  In our iOS class you will not be learning how to program games, however you will be able to learn how to develop social media applications similar to Snapchat and Instagram.
										</p>
										<p>
											Even if you do not want to become a professional developer and have it become your lifelong career, learning how an iOS app developed will give you the edge both in the immediate and distant future.  It might be a cliché, but learning how to code will empower you to act on future ideas.  For example if you are sitting in class one day and think of the next great social media app, it doesn’t have to just be a pipe dream or something that you would have to rely on someone else to build, it could be a project that you start building right away.
										</p>
										<a href="#" className="social-icon inline-block si-small si-light si-rounded si-facebook">
											<i className="icon-facebook"></i>
											<i className="icon-facebook"></i>
										</a>
										<a href="#" className="social-icon inline-block si-small si-light si-rounded si-twitter">
											<i className="icon-twitter"></i>
											<i className="icon-twitter"></i>
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-sm-4 col-padding" style={{background: "url('/images/kids.jpg') center center no-repeat", backgroundSize: 'cover'}}></div>
					</div>

					<div className="content-wrap" style={{background:'#f9f9f9', borderBottom:'1px solid #ddd'}}>

						<div className="container clear-bottommargin clearfix">
							<div className="row">

								<div className="col-md-4 col-sm-6 bottommargin">
									<div className="ipost clearfix">
										<div className="entry-image">
											<img style={{background:'#fff', padding:6, border:'1px solid #ddd'}} className="image_fade" src="/images/class.jpg" alt="FullStack 360" />
										</div>
										<div className="entry-title">
											<h3><a href="blog-single.html">Small Classes</a></h3>
											<hr />
										</div>
										<div className="entry-content">
											<p>
												Our average class size is six students and the maximum per class is ten. Every student recieves individual attenttion and no one falls far behind.
											</p>
										</div>
									</div>
								</div>

								<div className="col-md-4 col-sm-6 bottommargin">
									<div className="ipost clearfix">
										<div className="entry-image">
											<img style={{background:'#fff', padding:6, border:'1px solid #ddd'}} className="image_fade" src="/images/phone.jpg" alt="FullStack 360" />
										</div>
										<div className="entry-title">
											<h3><a href="blog-single.html">Realistic Projects</a></h3>
											<hr />
										</div>
										<div className="entry-content">
											<p>
												All courses are taught by current professionals who work on real projects. As such, our curriculum is heavily driven by the skills required in the tech industry and prepares our students for the challenges they will face.
											</p>
										</div>
									</div>
								</div>

								<div className="col-md-4 col-sm-6 bottommargin">
									<div className="ipost clearfix">
										<div className="entry-image">
											<img style={{background:'#fff', padding:6, border:'1px solid #ddd'}} className="image_fade" src="/images/joe.jpg" alt="FullStack 360" />
										</div>
										<div className="entry-title">
											<h3><a href="blog-single.html">Compassion conflict resolution, progressive; tackle</a></h3>
											<hr />
										</div>
										<div className="entry-content">
											<p>Community health workers best practices, effectiveness meaningful work The Elders fairness. Our ambitions local solutions globalization.</p>
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>


					<div className="container clearfix">
						<div id="faqs" className="faqs">
							<h3 style={{marginTop:48}}>Frequently Asked Questions:</h3>
							<div className="divider"><i className="icon-circle"></i></div>

							<div className="col_full nobottommargin">
								{faq}
							</div>
						</div>
					</div>

				</section>

		        <Modal show={this.state.showModal} onHide={this.closeModal}>
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h2>Request Syllabus</h2>
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24}}>
			        	<input className="form-control" type="text" id="name" placeholder="Name" /><br />
			        	<input className="form-control" type="text" id="email" placeholder="Email" /><br />

			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Submit</a>
			        </Modal.Footer>
		        </Modal>

				<Footer />
			</div>
		)
	}
}

const stateToProps = function(state) {
	var keys = Object.keys(state.courseReducer.courses)

    return {
        currentUser: state.profileReducer.currentUser,
        course: state.courseReducer.courses[keys[0]],
        testimonials: state.staticReducer.testimonials,
        faq: state.staticReducer.faq,
        loaderOptions: state.staticReducer.loaderConfig,
        banners: state.staticReducer.banners
    }
}


export default connect(stateToProps)(Course)