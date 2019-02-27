import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { updateUser } from './../../ducks/reducer'
import { connect } from 'react-redux';
import './Account.scss';
import {Elements} from 'react-stripe-elements';
import CheckoutForm from './../CheckoutForm/CheckoutForm';
import {Doughnut} from 'react-chartjs-2';
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

//PULL ACUTAL EMAIL AND USERNAME DATA FROM PROPS/PARAMS/AXIOS OR WHATEVER



class Account extends Component{
    constructor(props){
        super(props);
        this.state = {
            package: 'Small',
            price: 0.00,
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
            {user_id: 2, email: 'bbbbbb@bbbbbb.com', permissions: [{channel_id: 1, access: false}, {channel_id: 2, access: true}, {channel_id: 3, access: false}, {channel_id: 4, access: true}, {channel_id: 5, access: true}, {channel_id: 6, access: true}, {channel_id: 7, access: false}, {channel_id: 8, access: true}]}],
            utilData: {
                labels: [
                    'Electrical',
                    'Assembly',
                    'Testing',
                    'Packaging',
                    'Shipping',
                    'Lot Tracking',
                    'Orders',
                    'Payroll'
                ],
                datasets: [{
                    data: [300, 50, 100, 30, 80, 600, 400, 150],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FF6384',
                        '#36A2EB',
                        '#FF6384',
                        '#36A2EB',
                        '#FF6384',
                        '#36A2EB',
                        ],
                        hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FF6384',
                        '#36A2EB',
                        '#FF6384',
                        '#36A2EB',
                        '#FF6384',
                        '#36A2EB',
                        ]
                }],
                
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

    handleChange (prop, val) {
        this.setState({
            [prop]: val
        })
    }

    handleCheck (val) {
        console.log(val)
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
                    <div className='info-wrapper'>
                        <h2>Account Info</h2>
                        <p>username: a</p>
                        <p>email: a</p>
                        <button className='change-password'>change password</button>
                    </div>
                    <div className='permissions-wrapper'>
                        <div className='util-wrapper'>
                            <h2>Channel Utilization Comparison</h2>
                            <Doughnut className='util-doughnut' data={this.state.utilData}  options={{responsive: true, maintainAspectRatio: true}}/>
                        </div>
                        <h2>Channel Permissions</h2>
                        <p>save changes</p>
                        <p>just manually enter chartjs data in new sql tables. click on magnifying glass on user, get modal that shows animation progress bar with each channel they have access to as a dataset and using slides watch/all slides in channel over per month aggregated from first watch to present time</p>
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
                                            <td key={channel.id}><input type='checkbox' onChange={(e) => {this.handleCheck(e.target.value)}} checked /></td>
                                        ))}
                                    </tr>
                                    {
                                        this.state.permList.map(user => (
                                            <tr key={user.user_id}>
                                                <td>{user.email}</td>
                                                {user.permissions.map(channel => (
                                                    <td key={channel.channel_id}><input type='checkbox' checked={channel.access} onChange={(e) => {this.handleCheck(e.target.value)}} /></td>
                                                ))}
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                    <div className='payments-wrapper'>
                        <h2>Payments</h2>
                        <div className='payment-summary'>
                            <p className='summary'>Selected Package | {this.state.package}</p>
                            <p className='summary'>Price | ${this.state.price.toFixed(2)}</p>
                        </div>
                        <Elements>
                            <CheckoutForm price={this.state.price.toFixed(2)}/>
                        </Elements>
                        <div className='account-pricing-wrapper'>
                            <div className='account-option-box'>
                                <h3>Small</h3>
                                <h1>FREE</h1>
                                {
                                    (this.state.package === 'Small' ? <div style={{color: '#FFBD00'}}><h2>Selected Package</h2></div> 
                                    : <button className='package-select' onClick={() => {this.handleChange('package', 'Small'); this.handleChange('price', 0.00)}}><i className="far fa-check-circle"></i></button>)
                                }
                                <p>Up to 5 Projects</p>
                                <p>Full Editing Suite</p>
                                <p>Video Manager</p>
                            </div>
                            <div className='account-option-box'>
                                <h3>Medium</h3>
                                <h1>$100/month</h1>
                                {
                                    (this.state.package === 'Medium' ? <div style={{color: '#FFBD00'}}><h2>Selected Package</h2></div> 
                                    : <button className='package-select' onClick={() => {this.handleChange('package', 'Medium'); this.handleChange('price', 100.00)}}><i className="far fa-check-circle"></i></button>)
                                }
                                <p>Admin Controls</p>
                                <p>Project Sharing</p>
                                <p>Playlists Creator</p>
                            </div>
                            <div className='account-option-box'>
                                <h3>Large</h3>
                                <h1>$500/month</h1>
                                {
                                    (this.state.package === 'Large' ? <div style={{color: '#FFBD00'}}><h2>Selected Package</h2></div> 
                                    : <button className='package-select' onClick={() => {this.handleChange('package', 'Large'); this.handleChange('price', 500.00)}}><i className="far fa-check-circle"></i></button>)
                                }
                                <p>Unlimited Storage</p>
                                <p>Onboarding Support</p>
                                <p>Data Analytics</p>
                            </div>
                            <div className='account-option-box'>
                                <h3>Enterprise</h3>
                                <h1>CALL</h1>
                                {
                                    (this.state.package === 'Enterprise' ? <div style={{color: '#FFBD00'}}><h2>Selected Package</h2></div> 
                                    : <button className='package-select' onClick={() => {this.handleChange('package', 'Enterprise'); this.handleChange('price', 1000.00)}}><i className="far fa-check-circle"></i></button>)
                                }
                                <p>24/7 Customer Service</p>
                                <p>Advanced Training</p>
                                <p>Integrations</p>
                            </div>
                        </div>

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