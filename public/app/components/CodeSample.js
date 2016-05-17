import React, { Component } from 'react'
import TextUtils from '../utils/TextUtils'


class CodeSample extends Component {

	render(){
		var image = ''
		if (this.props.sample.topic == 'ios'){
			image = 'apple-2.jpg'
		}
		if (this.props.sample.topic == 'node'){
			image = 'node-red.png'
		}
		if (this.props.sample.topic == 'react'){
			image = 'apple-2.jpg'
		}

		var tags = this.props.sample.tags.map(function(tag, i){
			return <a style={{background:'#f9f9f9', marginRight:6}} href="#">{tag}</a>
		})

		var btnDownload = ''
		if (this.props.sample.isPublic == 'yes'){
	        btnDownload = <a href={this.props.sample.url} style={{float:'right'}} className="btn btn-primary" role="button">Download</a>
		}
		else if (this.props.accountType == 'premium'){
	        btnDownload = <a href={this.props.sample.url} style={{float:'right'}} className="btn btn-primary" role="button">Download</a>
		}
		else if (this.props.accountType == 'basic' || this.props.accountType == ''){
			btnDownload = <div style={{border:'1px solid #ddd', padding:12, background:'#f9f9f9', marginTop:12}}>To download, please <a style={{color:'red'}} onClick={ this.subscribe } href="#">upgrade</a> your account to Premium</div>
		}
		else { // not logged in
			btnDownload = <div style={{border:'1px solid #ddd', padding:12, background:'#f9f9f9', marginTop:12}}>Please <a onClick={ this.login } style={{color:'red'}} href="#">log in</a> or <a style={{color:'red'}} href="/#register">register</a> to download.</div>
		}

		return (
            <div key={this.props.sample.id} href="#" className="list-group-item">
            	<img style={{float:'left', width:96, borderRadius:48, marginRight:24}} src={'/images/'+image} />
                <h4 className="list-group-item-heading">{this.props.sample.title}</h4>
				<div className="tagcloud clearfix" style={{marginTop:0}}>
					{tags}
				</div>
                <p className="list-group-item-text" style={{marginTop:0}}>
					{this.props.sample.description}
                </p>
                <br />
                { btnDownload }
	            <br /><br />
            </div>


		)
	}

}

export default CodeSample