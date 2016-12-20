import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import styles from './styles'
import actions from '../../actions'
import { TextUtils } from '../../utils'

class Sidebar extends Component {
    constructor(){
        super()
        this.state = {
            register: true,
            visitor: {
                email: '',
                password: ''
            }
        }
    }

    componentDidMount(){
        if (this.props.tutorials == null)
            this.props.fetchTutorials(null)
//            console.log('FETCH TUTORIALS')

    }

    updateVisitor(event){
        var updatedVisitor = Object.assign({}, this.state.visitor)
        updatedVisitor[event.target.id] = event.target.value
        this.setState({
            visitor: updatedVisitor
        })
    }

    toggleLoginMode(event){
        event.preventDefault()
        console.log('toggleLoginMode')
        this.setState({
            register: !this.state.register
        })
    }

    submitCredentials(event){
        console.log('submitCredentials: '+JSON.stringify(this.state.visitor))
        event.preventDefault()

        if (this.state.register){ // sign up

            return
        }

        // log in
        this.props.login(this.state.visitor)
        .then((profile) => {
//            console.log('THEN: '+JSON.stringify(profile))
        })
        .catch((err) => {
            alert(err)
        })
    }

	render(){
        const account = (this.props.currentUser == null) ? 
        (
            <div style={{marginBottom:36, marginTop:12, textAlign:'right'}}>
                { (this.state.register) ? <input id="fullName" style={style.input} onChange={this.updateVisitor.bind(this)} type="text" placeholder="Full Name" /> : null }
                <input id="email" style={style.input} onChange={this.updateVisitor.bind(this)} type="text" placeholder="Email" /><br />
                <input id="password" style={style.input} onChange={this.updateVisitor.bind(this)} type="password" placeholder="Password" /><br />
                <a href="#" onClick={this.submitCredentials.bind(this)} className="button button-small button-circle button-border button-aqua">{ (this.state.register) ? 'Sign Up' : 'Log In'}</a>
                <br />
                { (this.state.register) ? <span style={style.smallText}>Already registered? Login <a onClick={this.toggleLoginMode.bind(this)} href="#">HERE</a>.</span> : <span style={style.smallText}>Sign up <a onClick={this.toggleLoginMode.bind(this)} href="#">HERE</a>.</span> }
            </div>
        )
        :
        (
            <div style={{marginBottom:36, marginTop:12, textAlign:'right'}}>
                <h4 style={{fontFamily:'Pathway Gothic One', fontWeight: 100, marginBottom:2}}>Welcome { this.props.currentUser.firstName.toUpperCase() }</h4>
                <Link to="/account" className="button button-small button-circle button-border button-aqua">View Account</Link>
            </div>
        )

		return (
            <div style={{padding:16}}>
                <div className="heading-block fancy-title nobottomborder nobottommargin title-bottom-border">
                    <h4 style={styles.title}>Account</h4>
                </div>
                { account }


                <div className="heading-block fancy-title nobottomborder title-bottom-border">
                    <h4 style={styles.title}>Recent <span>Tutorials</span></h4>
                </div>

                { (this.props.tutorials == null) ? null : 
                    this.props.tutorials.map((tutorial, i) => {
                        return (
                            <div key={i} className="clearfix" style={{marginBottom:16, lineHeight:'4px'}}>
                                <img style={styles.icon} src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=320'} />
                                <h4 style={{fontFamily:'Pathway Gothic One', fontWeight: 100, marginBottom:2}}>
                                    <Link to={'/tutorial/'+tutorial.slug} style={{color:'#444'}}>{tutorial.title}</Link>
                                </h4>
                                { (tutorial.price == 0) ? <span style={style.smallText}>Free</span> : <span style={style.smallText}>${TextUtils.numberWithCommas(tutorial.price)}</span> }
                            </div>
                        )
                    })
                }
            </div>
		)
	}
}

const style = {
    input: {
        border: 'none',
        borderBottom:'1px solid #eee',
        width: 100+'%',
        marginBottom: 12,
        padding: 4,
        fontWeight: 200,
        background: '#fff'
    },
    smallText: {
        fontSize:14, color:'#999', fontWeight:100
    }
}

const stateToProps = (state) => {
    return {
        currentUser: state.account.currentUser,
        courses: state.course.all,
        tutorials: state.tutorial.all
    }
}

const dispatchToProps = (dispatch) => {
    return {
        register: (params) => dispatch(actions.register(params)),
        login: (params) => dispatch(actions.login(params)),
        fetchCourses: (params) => dispatch(actions.fetchCourses(params)),
        fetchTutorials: (params) => dispatch(actions.fetchTutorials(params))
    }
}

export default connect(stateToProps, dispatchToProps)(Sidebar)
