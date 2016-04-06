import React, { Component } from 'react'

class Testimonial extends Component {

	render(){
		return (
			<div className="col-md-6 bottommargin">
				<div className="team team-list clearfix">
					<div className="team-image" style={{width:150}}>
						<img className="img-circle" src={'/images/'+this.props.testimonial.image} alt="Bryant Kellam" />
					</div>
					<div className="team-desc">
						<div className="team-title"><h4>{this.props.testimonial.name}</h4><span>{this.props.testimonial.course}</span></div>
						<div className="team-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, pariatur, magni! Omnis reiciendis architecto, cupiditate fuga dolores nam accusamus iste molestias quos mollitia totam eius porro culpa incidunt, sunt rerum molestiae aliquid non hic.</div>
						<div className="line topmargin-sm nobottommargin"></div>
						<a href="#" className="social-icon si-borderless si-small si-facebook" title="Facebook">
							<i className="icon-facebook"></i>
							<i className="icon-facebook"></i>
						</a>
						<a href="#" className="social-icon si-borderless si-small si-twitter" title="Twitter">
							<i className="icon-twitter"></i>
							<i className="icon-twitter"></i>
						</a>
						<a href="#" className="social-icon si-borderless si-small si-pinterest" title="Pinterest">
							<i className="icon-pinterest"></i>
							<i className="icon-pinterest"></i>
						</a>
						<a href="#" className="social-icon si-borderless si-small si-instagram" title="Instagram">
							<i className="icon-instagram"></i>
							<i className="icon-instagram"></i>
						</a>
					</div>
				</div>
			</div>			
		)
	}

}

export default Testimonial