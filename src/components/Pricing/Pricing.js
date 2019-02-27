import React, { Component } from 'react';
import Menu from './../Menu/Menu';
import { Link } from 'react-router-dom';
import pricing from './../../pricing.jpg'
import './Pricing.scss'
// import './../Home/Home.scss'


export default class Pricing extends Component{
    constructor(props){
        super(props)

        this.state = {
            showMenu: false
        }
    }
    handleOpenMenu = () => {
        this.setState({ showMenu: true })
    }
    handleCloseMenu = () => {
        this.setState({ showMenu: false });
    }
    render(){
        return(
            <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"/>
                {/* <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"></link> */}
                <link href="https://fonts.googleapis.com/css?family=Do+Hyeon" rel="stylesheet"></link>
                {/* {window.onscroll = () => {this.scrollFunction()}} */}
                <div className='header' id='header'>
                    <div className='header-left'>
                        <h1 className='logo'>method</h1>
                        {/* <h1 className='logo yel'>sop</h1> */}
                    </div>
                    <div className='header-right'>
                        <Link to='/register'><button className='register button' id='register'>SIGN UP FREE</button></Link>
                        <button className="hamburger" onClick={() => this.handleOpenMenu()}><i className="fas fa-bars"></i></button>
                    </div>
                </div>
                <div className='pricing-hero'>
                    <img className='pricing-hero-image' src={pricing} alt='working' />
                    <h1 className='pricing-hero-text'>A perfect suite of tools for every organization size</h1>
                </div>
                <div className='pricing-option-wrapper'>
                    <div className='option-box'>
                        <h3>Small</h3>
                        <h1>FREE</h1>
                        <Link to='/register'><button className='register button' id='register'>GET STARTED</button></Link>
                        <p>feature 1</p>
                        <p>feature 1</p>
                        <p>feature 1</p>
                    </div>
                    <div className='option-box'>
                        <h3>Medium</h3>
                        <h1>$100/month</h1>
                        <Link to='/register'><button className='register button' id='register'>GET STARTED</button></Link>
                        <p>feature 1</p>
                        <p>feature 1</p>
                        <p>feature 1</p>
                    </div>
                    <div className='option-box'>
                        <h3>Large</h3>
                        <h1>$500/month</h1>
                        <Link to='/register'><button className='register button' id='register'>GET STARTED</button></Link>
                        <p>feature 1</p>
                        <p>feature 1</p>
                        <p>feature 1</p>
                    </div>
                    <div className='option-box'>
                        <h3>Enterprise</h3>
                        <h1>CALL</h1>
                        <Link to='/register'><button className='register button' id='register'>GET STARTED</button></Link>
                        <p>feature 1</p>
                        <p>feature 1</p>
                        <p>feature 1</p>
                    </div>
                </div>



                <div>
                    <Menu 
                    showMenu={this.state.showMenu} 
                    closeMenu={this.handleCloseMenu}
                    />
                </div>
            </div>
        )
    }
}