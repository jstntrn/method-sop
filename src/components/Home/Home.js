import React, { Component } from 'react'
import macbook from './../../blank-macbook.png'
import screen from './../../mac-screen.png'
import './Home.css'
import Menu from './../Menu/Menu'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import {updateUser} from './../../ducks/reducer'

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

    render(){
        const { username, password } = this.state;
        return(
            <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous"/>
                <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"></link>
                <link href="https://fonts.googleapis.com/css?family=Do+Hyeon" rel="stylesheet"></link>
                <div className='header'>
                    <div className='header-left'>
                        <h1 className='logo'>method</h1>
                        <h1 className='logo yel'>sop</h1>
                    </div>
                    <div className='header-right'>
                        <Link to='/register'><button className='register button'>SIGN UP FREE</button></Link>
                        <button className="hamburger" onClick={() => this.handleOpenMenu()}><i className="fas fa-bars"></i></button>
                    </div>
                </div>
                <div className='hero'>
                    <div className='content-wrapper'>
                        <div className='content-body'>
                            <h1>Create and deploy your company's standard operating procedures</h1>
                            <p>Method is a video-based procedure implementation platform. With Method, you and your colleagues can easily create, share, and implement standard operating procedures better than ever before.</p>
                            <button className='demo button'>CREATE A FREE DEMO</button>
                        </div>
                    </div>
                    <img className='screen' src={screen} alt='screen' />
                    <img className='comp' src={macbook} alt='macbook' />
                </div>
                <div className='features-wrapper'>
                    <p className='yel' style={{fontWeight: 'bold', letterSpacing: '3px'}}>FEATURES</p>
                    <div className='feature-background'>
                        <div className='feature-container'>
                            <img className='feature-image' src='https://kontainer.com/content//2018/07/ss-1-768x783.png' alt='one' />
                            <div className='feature-content'>
                                <p>GDPR APPROVED SECURITY</p>
                                <h2>Simple and safe storage of pictures and files</h2>
                                <p>When you store and share large files, images and videos with external partners, the press or internally between departments, it's important that it's safe. 
Kontainer meets all GDPR data security requirements and with advanced user management, you can easily control which users are allowed to view, share and download files and images from your Kontainer.</p>
                                <button className='feature button'>READ MORE ABOUT SECURE FILE SHARING</button>
                            </div>
                        </div>
                        <div className='feature-container'>
                            <div className='feature-content'>
                                <p>GDPR APPROVED SECURITY</p>
                                <h2>Simple and safe storage of pictures and files</h2>
                                <p>When you store and share large files, images and videos with external partners, the press or internally between departments, it's important that it's safe. 
Kontainer meets all GDPR data security requirements and with advanced user management, you can easily control which users are allowed to view, share and download files and images from your Kontainer.</p>
                                <button className='feature button'>READ MORE ABOUT SECURE FILE SHARING</button>
                            </div>
                            <img className='feature-image' src='https://kontainer.com/content//2018/10/baum-design.jpg' alt='two' />
                        </div>
                    </div>

                </div>
                <p className='yel' style={{fontWeight: 'bold', letterSpacing: '3px'}}>REASONS</p>
                <div className='reasons-wrapper'>
                    <div className='reason-card'>
                        <img className='reason-image' src='https://kontainer.com/content//2018/10/15.svg' alt='two' />
                        <h3>Customized for your brand</h3>
                        <p>Kontainer can be customized based on your company's logo and guidelines to support your visual identity. In addition, Kontainer can be integrated with internal and external systems to support your workflow best as possible.</p>
                        <button className='reason button'>EXAMPLES</button>
                    </div>
                    <div className='reason-card'>
                        <img className='reason-image' src='https://kontainer.com/content//2018/10/14.svg' alt='two' />
                        <h3>Rights-determined image bank</h3>
                        <p>Kontainer allows you to share pictures and large files with external partners and create public media galleries. You can create both users and groups with specific rights. That way, you can easily control who sees what content.</p>
                        <button className='reason button'>MORE FEATURES</button>
                    </div>
                    <div className='reason-card'>
                        <img className='reason-image' src='https://kontainer.com/content//2018/10/12.svg' alt='two' />
                        <h3>Onboarding and support</h3>
                        <p>With our customized onboarding program, we ensure that you and your colleagues all have a common basis and a good understanding of how best to use Kontainer. In that it way we insure that Kontainer will be the best possible tool for you! Contact us here</p>
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
                        <h1>More than 001 companies already choose Method</h1>
                        <div className='register-reason'>
                            <img className='reg-image' src='https://kontainer.com/content//2018/10/14.svg' alt='reg-reason' />
                            <p className='reg-text'>Our effective search function allows your to access your material easily and quickly.</p>
                        </div>
                        <div className='register-reason'>
                            <img className='reg-image' src='https://kontainer.com/content//2018/10/7.svg' alt='reg-reason' />
                            <p className='reg-text'>We are constantly developing Kontainer, in that way our system will always be the best possible tool for you.</p>
                        </div>
                        <div className='register-reason'>
                            <img className='reg-image' src='https://kontainer.com/content//2018/10/1.svg' alt='reg-reason' />
                            <p className='reg-text'>Kontainer has an ISAE 3402 statement that meets the requirements of the Personal Data Regulation / GDPR.</p>
                        </div>
                    </div>
                    <div className='home-form-container'>
                        <div className='home-form'>
                            <h1>Register now - Free account</h1>
                            <h4>Create an account that remains free, without any minimum contract period</h4>
                            <input className='home-form-input' value={username} onChange={(e) => this.handleChange('username', e.target.value)}/>
                            <input className='home-form-input'/>
                            <input className='home-form-input' type='password' value={password} onChange={(e) => this.handleChange('password', e.target.value)}/>
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

                <div className='logo-wrapper'>
                    <h1 className='logo'>method</h1>
                    <h1 className='logo yel'>sop</h1>
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
                    <p style={{textAlign: 'left', paddingLeft: '100px'}}>Copyright 2019 Justin Tran All rights reserved</p>
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