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


		if (this.props.slug == 'ios-high-school-course'){
			console.log('IOS HIGH SCHOOL COURSE');

		}


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
											10<span>Feb</span>
											<div className="timeline-divider"></div>
										</div>
										<div className="entry-image">
											<a href="/images/blog/full/17.jpg" data-lightbox="image">
												<img className="image_fade" src="/images/hacking-2.jpg" alt="Standard Post with Image" />
											</a>
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
													<a href="/application" style={{marginRight:12}} className="button button-border button-dark button-rounded noleftmargin">Apply</a>
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
													<a onClick={this.openModal} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin topmargin-sm">Apply</a>
													<a onClick={this.openModal} href="#" className="button button-border button-dark button-rounded button-large noleftmargin topmargin-sm">Request Syllabus</a>
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
											<img style={{background:'#fff', padding:6, border:'1px solid #ddd'}} className="image_fade" src="/images/class.jpg" alt="Image" />
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
											<img style={{background:'#fff', padding:6, border:'1px solid #ddd'}} className="image_fade" src="/images/phone.jpg" alt="Image" />
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
											<img style={{background:'#fff', padding:6, border:'1px solid #ddd'}} className="image_fade" src="/images/joe.jpg" alt="Image" />
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

							<div className="col_half nobottommargin">
								<h4 id="faq-1"><strong>Q.</strong>  I don’t have a lot of experience coding; can I still take your summer class?</h4>
								<p>Of course!  FS360 High school summer program is designed with students that have limited experience in mind.  If you have some knowledge of coding, that is great! But if not that does not mean we cannot teach you.</p>
								<p>However we do screen our students.  We look to see that students are driven individuals, as well as what classes you are enrolled in, as well as other interests you have outside of school.  This is designed to ensure that no students enroll in a class that they are not ready and able to succeed in.</p>

								<div className="line"></div>

								<h4 id="faq-2"><strong>Q.</strong> Who are the instructors for the summer classes?</h4>
								<p>All of our instructors have worked in the technology field and have developed countless projects both big and small some which you probably have used! (insert examples of projects dan and dan have worked on)  Our instructors want to teach the next generation of programmers the most efficient and effective way to develop. All of our instructors are extremely qualified to teach you how to become a developer.  Because we are all working professionals we only teach you highly relevant information not theoretical information, we are not academics we are coders!</p>

								<div className="line"></div>

								<h4 id="faq-3"><strong>Q.</strong> Will this class help me get into College?  What about an internship in the future?</h4>
								<p>Yes, I am glad you asked.  FS360 Summer program will make all high school students a very attractive candidate for top colleges.  We can confidently say this because we know that Colleges want the next Steve Jobs, Mark Zuckerberg, Evan Spiegel (Snapchat), or Jack Dorsey (Twitter), to go to their college.  This makes college admissions officers constantly looking for students who know how to develop apps and websites.</p>
								<p>If your goal is to get an internship with exciting startups such as Uber or Instagram, learning how to code at FS360 is the perfect first step to take. Technology startups and giants such as Google and Apple all look for interns that have familiarity with code and have spent time developing.  After 2 weeks at FS360 you will be able to say, that you can build a project from scratch, which will impress any company while looking at a high schoolers or freshman in college resume.</p>
							</div>

							<div className="col_half nobottommargin col_last">
								<h4 id="faq-4"><strong>Q.</strong> Will I Have Fun?</h4>
								<p>Coding doesn’t have to be boring, although we wont be developing games, you will know how to create apps similar to, Snapchat, and YikYak.  Also, besides spending your day coding, we are going to have weekly hackothons, start up brainstorming and debate lunches, and at the end of the program we will have a coding competition.</p>

								<div className="line"></div>

								<h4 id="faq-5"><strong>Q.</strong> Where is the Summer Program for FS360?</h4>
								<p>
									Our location is <a target="_blank" href="https://www.wework.com/locations/new-york-city/nomad">WeWork</a> which is an exciting environment for all the students in the summer program.  WeWork is home to about 500 exciting companies and startups! This directly lends itself to help you understand what the daily life of working at a startup is like, because you will be around aot of employs at a wide variety of startups.  This creates a fun and exciting culture in the workshops.  WeWork has plenty of great areas to work and collaborate, debate, and enjoy your fellow students.  Also while you are attending the class at FS360 you will be able to take advantage of the great programming and networking opportunities WeWork organizes including socials, events hosted by companies, as well as interested speakers and presentations. 
								</p>

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
//	console.log('STATE TO PROPS: '+JSON.stringify(state));
	var keys = Object.keys(state.courseReducer.courses)

    return {
        currentUser: state.profileReducer.currentUser,
        course: state.courseReducer.courses[keys[0]],
        //course: state.courseReducer.courseArray[0],
        testimonials: state.staticReducer.testimonials,
        loaderOptions: state.staticReducer.loaderConfig

    }
}


export default connect(stateToProps)(Course)