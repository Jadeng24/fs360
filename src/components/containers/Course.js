import React, { Component } from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import actions from '../../actions'

class Course extends Component {
    componentDidMount(){
        // if (this.props.courses == null)
        //     this.props.fetchCourses(null)
    }

    showPaypal(event){
        event.preventDefault()
        const course = this.props.courses[this.props.slug]
        if (course.discountPaypalLink.length == 0){ // no discount code
            window.open(course.paypalLink, 'Velocity 360', 'width=650,height=900')
            return
        }

        // const promoCode = this.state.promoCode.trim()
        // if (promoCode.length == 0){
        //     window.open(course.paypalLink, 'Velocity 360', 'width=650,height=900')
        //     return
        // }

        // if (course.promoCodes.indexOf(promoCode) == -1){
        //     window.open(course.paypalLink, 'Velocity 360', 'width=650,height=900')
        //     return
        // }

        // successful promo code
//        window.open(course.discountPaypalLink, 'Velocity 360', 'width=650,height=900')
    }

	render(){
        const course = this.props.courses[this.props.slug]
        console.log('COURSE: '+JSON.stringify(course))

        const style = styles.home

		return (
			<div>
                <div className="heading-block topmargin-lg" style={{marginBottom:20}}>
                    <h2 style={styles.title}>{course.title}</h2>
                </div>

                <p style={styles.paragraph}>
                    <img style={{float:'right', width:180, border:'1px solid #ddd', background:'#fff', padding:3, marginLeft:12, marginBottom:12}} src={'https://media-service.appspot.com/site/images/'+course.image+'?crop=320'} />
                    {course.dates}<br />
                    ${course.tuition}
                    <br />
                </p>
                <p style={styles.paragraph}>
                    The Full Stack Immersive bootcamp covers backend and frontend development using the most up-to-date technologies. Using Node JS, Mongo, Express and React (with ES6), we create fully functional websites with user registration, image uploading, and email notification functionality. We also deeply explore React Native which leverages the powerful React library to build native iOS and Android apps in JavaScript. The Full Stack Immersive is one of a kind - we cover all the areas of the stack (backend, frontend, mobile) with the most modern libraries, frameworks and language.
                </p>

                <div className="postcontent clearfix topmargin">
                    <h3 style={styles.title}>Curriculum</h3>
                    <div id="posts" className="post-timeline clearfix">
                        <div className="timeline-border"></div>
                        {
                            course.units.map((unit, i) => {
                                const paragraph = styles.paragraph
                                paragraph['marginBottom'] = 0
                                return (
                                    <div key={i} className="entry clearfix" style={{border:'none'}}>
                                        <div className="entry-timeline">
                                            Unit<span>{i+1}</span>
                                            <div className="timeline-divider"></div>
                                        </div>
                                        <div className="panel panel-default" style={{maxWidth:500, boxShadow:'none', background:'#FDFEFE'}}>
                                            <div className="panel-body" style={{padding:24}}>
                                                <h3 style={styles.title}>{unit.topic}</h3>
                                                <hr />
                                                <p style={paragraph}>{unit.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="topmargin" style={{marginBottom:0}}>
                    <div className="col_half" style={styles.paragraph}>
                        <h3 style={styles.title}>Deposit</h3>
                        To secure a spot in the next class, submit a deposit below. If the class does not run for 
                        any reason, the deposit will be fully refunded. The first payment installment is due on the 
                        first day of class.
                        <br /><br />
                        <a onClick={this.showPaypal.bind(this)} href="#register" className="btn btn-success">Submit Deposit</a>

                    </div>
                    <div className="col_half col_last" style={styles.paragraph}>
                        <h3 style={styles.title}>Full Tuition</h3>
                        Submit the full tution today to receive a $200 discount. If the class does not run for 
                        any reason, your payment will be fully refunded.
                        <br /><br />
                        <a onClick={this.showPaypal.bind(this)} href="#" className="btn btn-success">Full Tution</a>
                    </div>
                </div>

			</div>
		)
	}
}

const stateToProps = (state) => {
    return {
        courses: state.course
    }
}

const dispatchToProps = (dispatch) => {
    return {
        fetchCourses: (params) => dispatch(actions.fetchCourses(params))
    }
}

export default connect(stateToProps, dispatchToProps)(Course)
