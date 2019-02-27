import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { updateUser } from './../../ducks/reducer'
import { connect } from 'react-redux';
import './Account.scss';
import {Elements} from 'react-stripe-elements';
import CheckoutForm from './../../CheckoutForm';
//CHANNEL AND PLAYLIST CREATOR

//ADMIN CONTROLS
//create email inviter and admin control panel
//panel has list of users invited, what channels they can view with check boxes and a resend email invite button, and admin checkbox
//when invite is created post to permissions table
//edit check boxes and save will put changes to permissions table
//add permissions check on project loading
//check permission to show or hide edit functions
//add resend email icon in table

//CHARTJS
//show progress bar of videos completed by users
//add completed checkbox on projects

//learn grid better

//CREATE CHANNEL AND PLAYLIST CREATOR WITH CHARTJS DASHBOARD SHOWING PROGRESS
//Assign projects to be viewed and use chartJS to show progress
//nest projects into playlists and channels

//VIMEO UPLOADER API
//vimeo video uploader API

//STRIPE INTEGRATION
//get stripe working and add payments inside account underneath admin console
//tiers can allow sharing, limit projects, or size of groups

//REFACTOR CODE TO BE DRY AND USE REDUX

class Account extends Component{
    constructor(props){
        super(props);
        this.state = {
            recipient: '',
            email: {
                to: 'justin.tran2290@gmail.com',
                from: 'join@methodsop.com',
                subject: 'Test Email from Method',
                text: 'Method is a video-based procedure implementation platform. With Method, you and your colleagues can easily create, share, and implement standard operating procedures better than ever before.',
                html: `<div><header><h1 style="text-align: center;">Method</h1></header><div><div style="color: black;"><img src="https://methodsop-0001.s3.amazonaws.com/macbook.png" style="display:block, align-self: center;" width="200px"/><h3>Bob Ross invited you to join Method</h3><p>Method is a video-based procedure implementation platform. With Method, you and your colleagues can easily create, share, and implement standard operating procedures better than ever before.</p><a href="http://www.google.com/" target="_blank"><h2>Create Account</h2></a></div></div><div><p>Copyright © 2019 Method, All rights reserved.</p></div></div>`
            },
            channelList: [{id: 1, name: 'electrical'}, {id: 2, name: 'assembly'}, {id: 3, name: 'testing'}, {id: 4, name: 'packaging'}, {id: 5, name: 'shipping'}, {id: 6, name: 'lot tracking'}, {id: 7, name: 'orders'}, {id: 8, name: 'payroll'}],
            permList: [{user_id: 1, email: 'a@a.com', permissions: [{channel_id: 1, access: true}, {channel_id: 2, access: true}, {channel_id: 3, access: true}, {channel_id: 4, access: true}, {channel_id: 5, access: true}, {channel_id: 6, access: true}, {channel_id: 7, access: false}, {channel_id: 8, access: true}]},
            {user_id: 2, email: 'bbbbbb@bbbbbb.com', permissions: [{channel_id: 1, access: false}, {channel_id: 2, access: true}, {channel_id: 3, access: false}, {channel_id: 4, access: true}, {channel_id: 5, access: true}, {channel_id: 6, access: true}, {channel_id: 7, access: false}, {channel_id: 8, access: true}]}]
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

    handleChange (prop, val) {
        this.setState({
            [prop]: val
        })
    }

    addPermission(){
        let eml = Object.assign({}, this.state.email)
        eml.to = this.state.recipient
        this.setState({
            email: eml
        })
        // axios.post('',{

        // })
        // .then(res => {
        //     this.sendEmail
        //     axios.get('')
        //     .then(res => {
        //         this.setState({
        //             permList: res.data
        //         })
        //     })
        // })
    }

    updatePermission(){
        // axios.put('',{

        // })
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
                    <div>
                        <h2>Account Info</h2>
                        <p>username: a</p>
                        <p>email: a</p>
                        <button>change password</button>
                    </div>
                    <div className='permissions-wrapper'>
                        <h2>Permissions Manager</h2>
                        <p>{this.state.email.to}</p>
                        <p>save changes</p>
                        <div className='permissions-table-wrapper'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>email</th>
                                        {
                                            this.state.channelList.map(channel => (
                                                <th key={channel.id}>{channel.name}</th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input style={{width: '70%'}} onChange={(e) => this.handleChange('recipient', e.target.value)} value={this.state.recipient} />
                                            <button onClick={() => this.addPermission()}>+</button>
                                        </td>
                                        {this.state.channelList.map((channel) => (
                                            <td key={channel.id}><input type='checkbox'/></td>
                                        ))}
                                    </tr>
                                    {
                                        this.state.permList.map(user => (
                                            <tr key={user.user_id}>
                                                <td>{user.email}</td>
                                                {user.permissions.map(channel => (
                                                    <td key={channel.channel_id}><input type='checkbox' value={channel.access}/></td>
                                                ))}
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                    <div>
                        <h2>Payments Manager</h2>
                        <Elements>
                            <CheckoutForm />
                        </Elements>
                    </div>
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