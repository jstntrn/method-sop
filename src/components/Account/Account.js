import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { updateUser } from './../../ducks/reducer'
import { connect } from 'react-redux';
import './Account.scss'



class Account extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: {
                to: 'justin.tran2290@gmail.com',
                from: 'justin@printloon.com',
                subject: 'Test Email from Method',
                text: 'Method is a video-based procedure implementation platform. With Method, you and your colleagues can easily create, share, and implement standard operating procedures better than ever before.',
                html: `<div><header><h1 style="text-align: center;">Method</h1></header><div><div style="color: black;"><img src="https://methodsop-0001.s3.amazonaws.com/macbook.png" style="display:block, align-self: center;" width="200px"/><h3>Bob Ross invited you to join Method</h3><p>Method is a video-based procedure implementation platform. With Method, you and your colleagues can easily create, share, and implement standard operating procedures better than ever before.</p><a href="http://www.google.com/" target="_blank"><h2>Create Account</h2></a></div></div><div><p>Copyright © 2019 Method, All rights reserved.</p></div></div>`
            }
        }
    }

    
    componentDidMount(){
        const {id} = this.props;
        if(!id){
            axios.get('./api/user')
            .then(res => {
                this.props.updateUser(res.data);
            })
            .catch(err => {
                this.props.history.push('/');
            })
        } else {
        }

    }
    
    sendEmail = () => {
        const { email } = this.state;
        axios.get(`/api/send-email?to=${email.to}&from=${email.from}&subject=${email.subject}&text=${email.text}&html=${email.html}`)
        .then(res => console.log('email sending'))
        .catch(err => console.log(err))
    }

    render(){
        return(
            <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"/>
                {/* <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"></link> */}
                <link href="https://fonts.googleapis.com/css?family=Do+Hyeon" rel="stylesheet"></link>
                <div className='header viewer-header dash'>
                    <div className='header-left'>
                        <h1 className='logo'>method</h1>
                        {/* <h1 className='logo yel'>sop</h1> */}
                        <h1 className='dash-title'>|   Account</h1>
                    </div>
                    <div className='header-right'>
                        <Link to='/dashboard' style={{ textDecoration: 'none' }}><button className="hamburger"><i className="fas fa-arrow-alt-circle-left"></i></button></Link>  
                    </div>
                </div>
                <div className='account-wrapper'>
                    <button onClick={this.sendEmail}>Email Test</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    const { id, username } = state
    return {
        id,
        username,
    };
};

export default connect(mapStateToProps, {updateUser})(Account);