import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { updateUser } from './../../ducks/reducer'
import { connect } from 'react-redux';
import './Account.scss';
import {Elements} from 'react-stripe-elements';
import CheckoutForm from './../CheckoutForm/CheckoutForm';
import {Doughnut} from 'react-chartjs-2';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


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
                subject: 'Invite to Join Method',
                text: 'Method is a video-based procedure implementation platform. With Method, you and your colleagues can easily create, share, and implement standard operating procedures better than ever before.',
                html: `<div><header><h1 style="text-align: center;">Method</h1></header><div><div style="color: black;"><img src="https://methodsop-0001.s3.amazonaws.com/macbook.png" style="display:block, align-self: center;" width="200px"/><h3>Bob Ross invited you to join Method</h3><p>Method is a video-based procedure implementation platform. With Method, you and your colleagues can easily create, share, and implement standard operating procedures better than ever before.</p><a href="http://134.209.14.200:4000/" target="_blank"><h2>Create Account</h2></a></div></div><div><p>Copyright © 2019 Method, All rights reserved.</p></div></div>`
            },
            newPerm: [],
            accessList: [],
            channelList: [],
            permList: [],
            utilData: {
                labels: ['Electrical','Assembly','Testing','Packaging','Shipping','Lot Tracking','Orders','Payroll'
                ],
                datasets: [{
                    data: [300, 50, 100, 30, 80, 600, 400, 150],
                    backgroundColor: ['#5D91FD','#565761','#FFBD00','#F3F3F3','#5D91FD','#565761','#FFBD00','#F3F3F3'],
                        hoverBackgroundColor: ['#5D91FD','#565761','#FFBD00','#F3F3F3','#5D91FD','#565761','#FFBD00','#F3F3F3']
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
                this.setState({
                    userID: this.props.id
                })
                axios.get(`/api/channels/${this.props.id}`)
                .then(res => {
                    const initPerm = res.data.map(channel => {
                        return {channel_id: channel.id, view: true}
                    })
                    this.setState({
                        channelList: res.data,
                        newPerm: initPerm
                    })
                })
                // axios.get(`/api/access/${this.props.id}`)
                // .then(res => {
                //     console.log(res.data)
                //     this.setState({
                //         accessList: res.data
                //     })
                //     const permArr = []
                //     res.data.forEach(access => {
                //         axios.get(`/api/permissions/${access.user_email}`)
                //         .then(res => {
                //             res.data.map(perm => {
                //                 permArr.push(perm)
                //             })
                //         })
                //     })
                //     console.log(permArr)
                //     permArr.sort((a, b) => {
                //         return a.channel_id - b.channel_id
                //     })
                //     this.setState({
                //         permList: permArr
                //     })
                // })
            })
            .catch(err => {
                this.props.history.push('/');
            })
        } else {
            this.setState({
                userID: id
            })
            axios.get(`/api/channels/${this.props.id}`)
            .then(res => {
                const initPerm = res.data.map(channel => {
                    return {channel_id: channel.id, view: true}
                })
                this.setState({
                    channelList: res.data,
                    newPerm: initPerm
                })
                // axios.get(`/api/access/${this.props.id}`)
                // .then(res => {
                //     console.log(res.data)
                //     this.setState({
                //         accessList: res.data
                //     })
                //     const permArr = []
                //     res.data.forEach(access => {
                //         axios.get(`/api/permissions/${access.user_email}`)
                //         .then(res => {
                //             res.data.map(perm => {
                //                 permArr.push(perm)
                //             })
                //         })
                //     })
                //     console.log(permArr)
                //     permArr.sort((a, b) => {
                //         return a.channel_id - b.channel_id
                //     })
                //     this.setState({
                //         permList: permArr
                //     })
                // })
            })
        }
        this.setState({
            userID: id
        })
    }

    handleChange (prop, val) {
        this.setState({
            [prop]: val
        })
    }

    handleCheck (chid) {
        const newerPerm = this.state.newPerm.map(permission => {
            if(permission.channel_id === chid){
                return {channel_id: chid, view: !permission.view}
            } else {
                return permission
            }
        }) 
        this.setState({
            newPerm: newerPerm
        })
    }

    addPermission(){
        let eml = Object.assign({}, this.state.email)
        eml.to = this.state.recipient
        this.setState({
            email: eml
        })
        axios.post('/api/access', {
            owner_id: this.props.id,
            user_email: this.state.recipient
        })
        .then(res => {
            this.state.newPerm.map(permission => {
                axios.post('/api/permission',{
                    email: this.state.recipient,
                    channel_id: permission.channel_id,
                    view: permission.view
                })
                .then(res => {console.log(this.state)})
                return console.log('permission added')
            })
        })
        this.setState({
            recipient: ''
        })
        this.sendEmail()
    }

    changePassword(){
        // this.state.permList[0].map(perm => {
        //     console.log(perm)
        // })
        // console.log(this.state.permList)
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
        const { permList } = this.state
        const { username, email } = this.props
        return(
            <div>
                <div className='header viewer-header dash'>
                    <div className='header-left'>
                        <h1 className='logo'>method</h1>
                        {/* <h1 className='logo yel'>sop</h1> */}
                        <h1 className='dash-title'>|   Account</h1>
                    </div>
                    <div className='header-right'>
                        <OverlayTrigger placement='left' overlay={<Tooltip id={`tooltip-bottom`} className='trigger'>Dashboard</Tooltip>}>
                            <Link to='/dashboard' style={{ textDecoration: 'none' }}><button className="hamburger"><i className="fas fa-arrow-alt-circle-left"></i></button></Link>
                        </OverlayTrigger>  
                    </div>
                </div>
                <div className='account-wrapper'>
                    <div className='info-wrapper'>
                        <div className='info-box'>
                            <h2>Account Info</h2>
                            <p>username: {username}</p>
                            <p>email: {email}</p>
                            <button className='change-password' onClick={() => {this.changePassword()}}>change password</button>
                        </div>
                    </div>
                    <div className='permissions-container'>
                        <div className='util-wrapper'>
                            <h2>Channel Utilization Comparison</h2>
                            <Doughnut className='util-doughnut' data={this.state.utilData}  options={{responsive: true, maintainAspectRatio: true}}/>
                        </div>
                        <div className='permissions-wrapper'>
                            <h2>Channel Permissions</h2>
                            <button className='save-perm'>save changes</button>
                            <div className='permissions-table-wrapper'>
                                <p>{permList[0]}</p>
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
                                            {this.state.newPerm.map((channel, index) => (
                                                <td key={index}><input type='checkbox' onChange={() => {this.handleCheck(channel.channel_id)}} checked={channel.view} /></td>
                                            ))}
                                        </tr>
                                        {/* {
                                            
                                            accessList.map((user, index) => (
                                                <tr key={user.id}>
                                                    <td>{user.user_email}</td>
                                                    {
                                                        permList.map(channel => (
                                                        <td key={channel.channel_id}>
                                                            <input type='checkbox' checked={channel.view} onChange={(e) => {this.handleCheck(e.target.value)}} />
                                                        </td>
                                                        ))
                                                    }
                                                </tr>
                                            ))
                                        } */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                    </div>
                    <div className='payments-wrapper'>
                        
                        
                        {
                            (this.state.price > 0.00 ?
                            <div>
                                <h2>Payments</h2>
                                <div className='payment-summary'>
                                    <p className='summary'>Selected Package | {this.state.package}</p>
                                    <p className='summary'>Price | ${this.state.price.toFixed(2)}</p>
                                </div>
                                <Elements>
                                    <CheckoutForm price={this.state.price.toFixed(2)}/>
                                </Elements>
                            </div>
                            : <div><h2>Select a Package</h2></div>)
                        }
                        <div className='account-pricing-wrapper'>
                            <div className='account-option-box'>
                                <h3>Small</h3>
                                <h1>FREE</h1>
                                {
                                    (this.state.package === 'Small' ? <div style={{color: '#FFBD00'}}><h2 style={{margin: '30px 0'}}>Selected Package</h2></div> 
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
                                    (this.state.package === 'Medium' ? <div style={{color: '#FFBD00'}}><h2 style={{margin: '30px 0'}}>Selected Package</h2></div> 
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
                                    (this.state.package === 'Large' ? <div style={{color: '#FFBD00'}}><h2 style={{margin: '30px 0'}}>Selected Package</h2></div> 
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
                                    (this.state.package === 'Enterprise' ? <div style={{color: '#FFBD00'}}><h2 style={{margin: '30px 0'}}>Selected Package</h2></div> 
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
    const { id, username, email } = state
    return {
        id,
        username,
        email
    };
};

export default connect(mapStateToProps, {updateUser})(Account);