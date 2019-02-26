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
                text: 'This is plain text version of the email, will show if html not available',
                html: '<h1>This is the html version of the email</h1>'
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
        .catch(err => console.loglog(err))
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