import React, { Component } from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import actions from '../../actions'
import { TextUtils } from '../../utils'

class Course extends Component {
    constructor(){
        super()
        this.state = {
            visitor: {
                name: '',
                email: '',
                subject: ''
            }
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    updateVisitor(event){
        var updatedVisitor = Object.assign({}, this.state.visitor)
        updatedVisitor[event.target.id] = event.target.value
        this.setState({
            visitor: updatedVisitor
        })      
    }

    showPaypal(link, event){
        event.preventDefault()
        const course = this.props.courses[this.props.slug]
        window.open(link, 'Velocity 360', 'width=650,height=900')
        
        // if (course.discountPaypalLink.length == 0){ // no discount code
        //     window.open(course.paypalLink, 'Velocity 360', 'width=650,height=900')
        //     return
        // }
    }

	render(){
        const course = this.props.courses[this.props.slug]
        const style = styles.home

		return (
			<div>
                <section className="parallax-window" id="short" data-parallax="scroll" data-image-src="/img/desktop.jpg" data-natural-width="1400" data-natural-height="350">
                    <div id="subheader">
                        <h1>{course.title}</h1>
                    </div>
                </section>

                <div className="container margin_60_35">
                    <div className="row">
                    
                        <div className="col-md-3" id="sidebar">
                            <div className="theiaStickySidebar">
                                <div id="faq_box">
                                    <ul id="cat_nav">
                                        <li><a href="#overview" className="active">Overview</a></li>
                                        <li><a href="#curriculum">Curriculum</a></li>
                                        <li><a href="#register">Register</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-9">
                            <h3 className="nomargin_top">Overview</h3>
                            <hr />

                            <div className="panel-group" id="overview">
                                <div className="row">
                                    <div className="col-md-9">
                                        <img style={{border:'1px solid #ddd', width:260, marginBottom:16}} alt={course.title} src={'https://media-service.appspot.com/site/images/'+course.image+'?crop=320'} />
                                        <br />
                                        <span style={{padding:4, background:'#f9f9f9', border:'1px solid #ddd', marginRight:12}}>{ (course.dates.length==0) ? 'Coming Soon' : course.dates }</span>
                                        <span style={{padding:4, background:'#f9f9f9', border:'1px solid #ddd', marginRight:12}}>{ course.schedule }</span>
                                        <span style={{padding:4, background:'#f9f9f9', border:'1px solid #ddd', marginRight:12}}>{ (course.tuition == 0) ? 'Free' : '$'+course.tuition+'.00'}</span>
                                        <br /><br />
                                        <p dangerouslySetInnerHTML={{__html: TextUtils.convertToHtml(course.description) }}></p>
                                    </div>
                                </div>
                            </div>
 
                            <h3 className="nomargin_top">Curriculum</h3>
                            <hr />
                            <div className="panel-group" id="curriculum">
                                <div className="row">
                                    <div className="col-md-8">
                                        { course.units.map((unit, i) => {
                                                return (
                                                    <div key={i} className="entry clearfix" style={{border:'none', marginBottom:24}}>
                                                        <div className="panel panel-default" style={{boxShadow:'none', background:'#FDFEFE'}}>
                                                            <div className="panel-body" style={{padding:24}}>
                                                                <h3 style={{marginTop:0}}>{unit.topic}</h3>
                                                                <hr />
                                                                <p style={styles.paragraph}>{unit.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            <h3 className="nomargin_top">Register</h3>
                            <hr />
                            <div className="panel-group" id="register">
                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="box_style_3" id="general_facilities">
                                            <h3>Deposit</h3>
                                            <p>
                                                To secure a spot in the next class, submit a deposit below. If the class does not run for 
                                                any reason, the deposit will be fully refunded. The first payment installment is due on the 
                                                first day of class.
                                            </p>

                                            <button onClick={this.showPaypal.bind(this, course.discountPaypalLink)} style={{height:36, borderRadius:18, marginTop:12}} className="btn_1 white" href="#">Submit Deposit</button>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="box_style_3" id="general_facilities">
                                            <h3>Full Tuition</h3>
                                            <p>
                                                Submit the full tuition today to receive a $200 discount. If the class does not run for 
                                                any reason, your payment will be fully refunded.
                                            </p>

                                            <button onClick={this.showPaypal.bind(this, course.paypalLink)} style={{height:36, borderRadius:18, marginTop:12}} className="btn_1 white" href="#">Submit Full Tuition</button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                                
                        </div>
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
