import React, { Component } from 'react'
import macbook from './../../blank-macbook.png'
import './Home.css'

class Home extends Component{
    render(){
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
                        <button className='register button'>SIGN UP FREE</button>
                        <button className="hamburger"><i className="fas fa-bars"></i></button>
                    </div>
                </div>
                <div className='hero'>
                    <div className='content-wrapper'>
                        <div className='content-body'>
                            <h1>Create and deploy your company's standard operating procedures</h1>
                            <p>Method is a cloud based video-based procedure platform. With Method, you and your colleagues can easily create, share, and implement standard operating procedures better than ever before.</p>
                            <button className='demo button'>CREATE A FREE DEMO</button>
                        </div>
                    </div>
                    <div className='content-image'>
                        <img className='comp' src={macbook} alt='macbook' />
                    </div>
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
                <div className='reasons-wrapper'>
                    <p className='yel' style={{fontWeight: 'bold', letterSpacing: '3px'}}>REASONS</p>
                    <div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Home;