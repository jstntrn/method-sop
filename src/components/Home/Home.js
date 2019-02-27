import React, { Component } from 'react'
import './Home.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import {updateUser} from './../../ducks/reducer'
import Menu from './../Menu/Menu'
import macbook from './../../macbook.png'
import dashboard from './../../dashboard.png'
import newproject from './../../newproject.png'

class Home extends Component{
    constructor(props){
        super(props)

        this.state = {
            showMenu: false,
            username: '',
            password: ''
        }
    }

    componentDidMount(){
        const { id } = this.props;
        if (id) {
            this.props.history.push('/dashboard')
        } else {
            axios.get('/api/user')
            .then(res => {
                this.props.updateUser(res.data)
                this.props.history.push('./dashboard')
            })
            .catch(err => {

            })
        }
    }

    handleChange (prop, val) {
        this.setState({
            [prop]: val
        })
    }

    register = () => {
        const { username, password } = this.state
        axios.post('/auth/register', { username, password })
        .then(res => {
            this.props.updateUser(res.data)
            this.props.history.push('/dashboard');
        })
        .catch((err) => console.log(err))
    }

    handleOpenMenu = () => {
        this.setState({ showMenu: true })
    }
      
    handleCloseMenu = () => {
        this.setState({ showMenu: false });
    }

    // scrollFunction = () => {
    //     if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    //         document.getElementById("header").style.fontSize = "1em";
    //         document.getElementById("register").style.height = "30px";
    //       } else {
    //         document.getElementById("header").style.fontSize = "1.5em";
    //         document.getElementById("register").style.height = "40px";
    //       }
    // }

    render(){
        const { username, password } = this.state;
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
                <div className='hero'>
                    <div className='content-wrapper'>
                        <div className='content-body'>
                            <h1>Create and deploy your company's standard operating procedures</h1>
                            <p>Method is a video-based procedure implementation platform. With Method, you and your colleagues can easily create, share, and implement standard operating procedures better than ever before.</p>
                            <Link to='/register'><button className='demo button'>CREATE A FREE DEMO</button></Link>
                        </div>
                    </div>
                    <div className='comp-wrapper'>
                        <img className='gif' src='https://media.giphy.com/media/8mb5XMcQLiukzzj9kd/giphy.gif' alt='book-making' />
                        <img className='comp' src={macbook} alt='macbook' />
                    </div>
                </div>
                <div className='features-wrapper'>
                    <p className='yel' style={{fontWeight: 'bold', letterSpacing: '3px'}}>FEATURES</p>
                    <div className='feature-background'>
                        <div className='feature-container'>
                            <img className='feature-image' src={newproject} alt='one' />
                            <div className='feature-content'>
                                <p>SUPER SIMPLE SOP CREATOR</p>
                                <h2>Method is the quickest way to create super effective SOPs</h2>
                                <p>Method allows you to combine video, documents, code, images, and other media types to create standard operating procedures. All of this without having to do time consuming video editing and document formatting. The flexibility of the Method platform makes it useful for every department in an organization.</p>
                                <button className='feature button'>READ MORE ABOUT OUR STANDARD OPERATION PROCEDURE CREATOR</button>
                            </div>
                        </div>
                        <div className='feature-container'>
                            <div className='feature-content'>
                                <p>SIMPLE AND SECURE FILE MANAGEMENT</p>
                                <h2>Your SOPs are secure and accessible from the cloud</h2>
                                <p>Method makes it easy to manage permissions for each project. Method makes it easy to access important procedures whenever they are needed. Projects can be nested in order to create relationships and dependencies between procedures.</p>
                                <button className='feature button'>READ MORE ABOUT OUR FILE MANAGEMENT SYSTEM</button>
                            </div>
                            <img className='feature-image' src={dashboard} alt='two' />
                        </div>
                    </div>

                </div>
                <p className='yel' style={{fontWeight: 'bold', letterSpacing: '3px'}}>REASONS</p>
                <div className='reasons-wrapper'>
                    <div className='reason-card'>
                        <img className='reason-image' src='https://kontainer.com/content//2018/10/15.svg' alt='two' />
                        <h3>Increase operating consistency</h3>
                        <p>Using Method to deploy standard operating procedures has proven to increase retention and transparency across organizations. Our video based platform provides greater detail in how operations should be performed.</p>
                        <button className='reason button'>EXAMPLES</button>
                    </div>
                    <div className='reason-card'>
                        <img className='reason-image' src='https://kontainer.com/content//2018/10/14.svg' alt='two' />
                        <h3>Save money and time</h3>
                        <p>Writing standard operating procedures are time-consuming and our normally written by higher salary persons. Method makes building standard operating procedures faster and uniform for every department.</p>
                        <button className='reason button'>SEE DATA</button>
                    </div>
                    <div className='reason-card'>
                        <img className='reason-image' src='https://kontainer.com/content//2018/10/12.svg' alt='two' />
                        <h3>Onboarding and support</h3>
                        <p>With our customized onboarding program, we ensure that you and your colleagues all have a common basis and a good understanding of how best to use Method. In that way we insure that Method will be the best possible tool for you!</p>
                        <button className='reason button'>CONTACT US</button>
                    </div>
                </div>
                <div className='reviews-wrapper'>
                    <div className='reviews-overlay'>
                        <div className='review-text'>
                            <h3>"With Method, we've got an overview of all our procedures, and we have had a great increase in the quality of our product"</h3>
                            <p>Bob Ross / The Joy of Painting </p>
                        </div>
                    </div>
                    <div className='reviews-background'></div>
                </div>

                <div className='register-home'>
                    <div className='register-home-content'>
                        <h1>More than 1000 organizations already choose Method</h1>
                        <div className='register-reason'>
                            <img className='reg-image' src='https://kontainer.com/content//2018/10/14.svg' alt='reg-reason' />
                            <p className='reg-text'>Method is the best way to build operating procedure resources.</p>
                        </div>
                        <div className='register-reason'>
                            <img className='reg-image' src='https://kontainer.com/content//2018/10/7.svg' alt='reg-reason' />
                            <p className='reg-text'>Method is effective for any organization size and can scale as you scale.</p>
                        </div>
                        <div className='register-reason'>
                            <img className='reg-image' src='https://kontainer.com/content//2018/10/1.svg' alt='reg-reason' />
                            <p className='reg-text'>Method exceeds file security standards to protect your operating practices.</p>
                        </div>
                    </div>
                    <div className='home-form-container'>
                        <div className='home-form'>
                            <h1>Register now - Free account</h1>
                            <h4>Create an account that remains free, without any minimum contract period</h4>
                            <div className='input-div'>
                                <i className="fas fa-user"></i>
                                <input className='home-form-input' placeholder={'username'} value={username} onChange={(e) => this.handleChange('username', e.target.value)}/>
                            </div>
                            <div className='input-div'>
                                <i className="fas fa-envelope"></i>
                                <input className='home-form-input' placeholder={'email'} />
                            </div>
                            <div className='input-div'>
                                <i className="fas fa-key"></i>
                                <input className='home-form-input' placeholder={'password'} type='password' value={password} onChange={(e) => this.handleChange('password', e.target.value)}/>
                            </div>
                            <button className='form button' onClick={this.register}>GET STARTED - FREE</button>
                            <p className='terms'>When signing up you accept the terms and conditions</p>
                        </div>
                    </div>
                </div>

                <div>
                    <Menu 
                    showMenu={this.state.showMenu} 
                    closeMenu={this.handleCloseMenu}
                    />
                </div>


                <div className='logo-wrapper lower-logo'>
                    <h1 className='logo'>method</h1>
                    {/* <h1 className='logo yel'>sop</h1> */}
                </div>
                <footer>
                    <div className='footer-main'>
                        <div className='footer-content'>
                            <p style={{fontWeight: 'bold'}}>News</p>
                            <p>News 1</p>
                            <p>News 2</p>
                            <p>News 3</p>
                            <p>News 4</p>
                        </div>
                        <div className='footer-content'>
                            <p style={{fontWeight: 'bold'}}>Industries</p>
                            <p>Industries 1</p>
                            <p>Industries 2</p>
                            <p>Industries 3</p>
                            <p>Industries 4</p>
                        </div>
                        <div className='footer-content'>
                            <p style={{fontWeight: 'bold'}}>Products</p>
                            <p>Products 1</p>
                            <p>Products 2</p>
                            <p>Products 3</p>
                            <p>Products 4</p>
                        </div>
                        <div className='footer-content'>
                            <p style={{fontWeight: 'bold'}}>Company</p>
                            <p>Company 1</p>
                            <p>Company 2</p>
                            <p>Company 3</p>
                            <p>Company 4</p>
                        </div>
                    </div>
                    <p className='copyright'>Copyright 2019 Justin Tran All rights reserved</p>
                </footer>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        id: state.id
    }
}

export default connect(mapStateToProps, {updateUser})(Home)