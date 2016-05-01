import React, { Component } from 'react'
import Loader from 'react-loader'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import api from '../../api/api'
import DateUtils from '../../utils/DateUtils'
import TextUtils from '../../utils/TextUtils'


class Project extends Component {
	constructor(props, context){
		super(props, context)
		this.state = {
			showLoader: false,
		}
	}

	componentWillMount(){

	}

	componentDidMount(){
		var url = '/api/project?slug='+this.props.slug
		api.handleGet(url, {}, function(err, response){
			if (err){
				alert(response.message)
				return
			}

			console.log(JSON.stringify(response));
			store.dispatch(actions.projectsRecieved(response.projects))
		})
	}

	render(){

		return (

			<div style={{background:'#f5f5f5'}}>
				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
				<Sidebar />

				<section id="content">
					<div className="content-wrap" style={{background:'#f5f5f5'}}>

						<div className="entry clearfix">
							<div className="container clearfix">
								<div className="heading-block center">
									<h1>{this.props.project.title}</h1>
									<img style={{border:'1px solid #ddd', background:'#fff', marginTop:12}} src={'https://media-service.appspot.com/site/images/'+this.props.project.image+'?crop=260'} alt="FullStack 360" />
								</div>

								<div className="entry-c">
									<div className="entry-content">
										<div className="panel panel-default" style={{background:'#f1f9f5'}}>

											<ul className="entry-meta clearfix" style={{paddingLeft:24, paddingTop:10, paddingBottom:16, borderBottom:'1px solid #eee'}}>
											</ul>

											<div style={{background:'#fff', padding: 24}} dangerouslySetInnerHTML={{__html: TextUtils.convertToHtml(this.props.project.description) }} className="panel-body">
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>

					</div>

				</section>



				<Footer />
			</div>

		)

	}
}

const stateToProps = function(state) {
	var projects = state.projectReducer.projectsArray
	console.log('STATE TO PROPS: '+JSON.stringify(projects))

    return {
        currentUser: state.profileReducer.currentUser,
        project: (projects==null) ? state.projectReducer.emptyProject : projects[0],
        loaderOptions: state.staticReducer.loaderConfig
    }
}

export default connect(stateToProps)(Project)