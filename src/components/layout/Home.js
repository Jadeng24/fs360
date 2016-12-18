import React, { Component } from 'react'
import styles from './styles'
import { Footer, Section } from '../view'

class Home extends Component {
    componentDidMount(){
        window.scrollTo(0 ,0)
    }
    
	render(){
		const style = styles.home

		return ( 
			<div className="clearfix">

                <Section content="header" />
                <Section content="articles" />
                <Section content="velocityAdvantage" />
                <Section content="testimonials" />
                <Section content="companies" />

                <Footer />

			</div>
		)
	}
}

export default Home
