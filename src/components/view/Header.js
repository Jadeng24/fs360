import React, { Component } from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import styles from './style'

class Header extends Component {
	constructor(){
		super()
		this.state = {
			showModal: false,
			visitor: {
				name: '',
				email: '',
				course: 'Full Stack Immersive'
			}
		}
	}

	toggleModal(){
		this.setState({
			showModal: !this.state.showModal
		})
	}

	updateVisitor(event){
        var updatedVisitor = Object.assign({}, this.state.visitor)
        updatedVisitor[event.target.id] = event.target.value
        this.setState({
            visitor: updatedVisitor
        })
	}

	requestSyllabus(event){
		event.preventDefault()

        let updated = Object.assign({}, this.state.visitor)
        let nameParts = this.state.visitor.fullName.split(' ')
        updated['firstName'] = nameParts[0]
        updated['lastName'] = (nameParts.length > 1) ? nameParts[nameParts.length-1] : ''

        


	}

	render(){
		return (
		    <section className="page-section section parallax dark" style={{background: 'url("/images/oc-dark-blue.jpg") center', overflow:'visible', margin:0}} data-height-lg="425" data-height-md="425" data-height-sm="850" data-height-xs="850" data-height-xxs="850">
		        <div className="vertical-middle">
		            <div className="heading-block center nobottomborder">
		                <h1 style={styles.titleWhite} data-animate="fadeInUp">Become a Full Stack Developer</h1>
		                <span style={{fontWeight:300}} data-animate="fadeInUp" data-delay="300">
		                    Velocity 360 is the only coding bootcamp that trains students for the future 
		                    of software - Node, React, and React Native.
		                </span>
		                <br /><br />

		                <div data-animate="fadeIn" data-delay="800">
		                    <button onClick={this.toggleModal.bind(this)} className="btn btn-lg btn-info nomargin" value="submit" type="submit">Request Syllabus</button>
		                    <br /><br />
		                    <h4 style={styles.titleWhite}>Next Cohort Begins January 9th</h4>
		                </div>                          
		            </div>
		        </div>

		        <Modal bsSize="sm" show={this.state.showModal} onHide={this.toggleModal.bind(this)}>
			        <Modal.Body style={{background:'#f9f9f9', padding:24, borderRadius:3}}>
			        	<div style={{textAlign:'center'}}>
				        	<img style={{width:96, borderRadius:48, border:'1px solid #ddd', background:'#fff', marginBottom:24}} src='/images/logo_round_blue_260.png' />
				        	<h4>Request Syllabus</h4>
			        	</div>
			        	<input onChange={this.updateVisitor.bind(this)} id="name" className="form-control" style={{marginBottom:12}} type="text" placeholder="Name" />
			        	<input onChange={this.updateVisitor.bind(this)} id="email" className="form-control" style={{marginBottom:12}} type="text" placeholder="Email" />
						<div style={{textAlign:'center', marginTop:24}}>
							<a href="#" className="button button-border button-dark button-rounded button-large noleftmargin">Submit</a>
						</div>
			        </Modal.Body>

		        </Modal>

		    </section>
		)
	}
}

export default Header
