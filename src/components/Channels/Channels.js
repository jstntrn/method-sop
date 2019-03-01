import React, { Component } from 'react';
import './Channels.scss'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { updateUser } from './../../ducks/reducer';
import { connect } from 'react-redux';


//get user from redux  'electrical', 'assembly', 'testing', 'packaging', 'shipping', 'lot tracking', 'orders', 'payroll'
class Channels extends Component{
    constructor(props){
        super(props)
        this.state = {
            userID: null,
            channelName: '',
            channelList: []
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
                    this.setState({
                        channelList: res.data
                    })
                })
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
                this.setState({
                    channelList: res.data
                })
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

    addChannel(){
        const { id } = this.props
        axios.post('/api/channels', {
            name: this.state.channelName,
            owner_id: id
        })
        .then(
            axios.get(`/api/channels/${id}`)
            .then(res => {
                this.setState({
                    channelList: res.data,
                    channelName: ''
                })
            })
        )
    }

    render(){
        return(
            <div>
                <div className='header viewer-header dash'>
                    <div className='header-left'>
                        <h1 className='logo'>method</h1>
                        {/* <h1 className='logo yel'>sop</h1> */}
                        <h1 className='dash-title'>|   Channel Manager</h1>
                    </div>
                    <div className='header-right'>                       
                        <OverlayTrigger placement='bottom' overlay={<Tooltip id={`tooltip-bottom`} className='trigger'>Dashboard</Tooltip>}>
                            <Link to='/dashboard' style={{ textDecoration: 'none' }}><button className="hamburger"><i className="fas fa-arrow-alt-circle-left"></i></button></Link>
                        </OverlayTrigger>  
                    </div>
                </div>
                <div className='channel-wrapper'>
                    <div className='channel-input'><p>Add Channel</p><div><input onChange={(e) => {this.handleChange('channelName', e.target.value)}} value={this.state.channelName} /><button onClick={() => this.addChannel()}>+</button></div></div>
                    <div className='channel-list'>
                        {
                            this.state.channelList.map((channel, index) => (
                                <div className='list-item' key={index}>
                                    <p>{channel.name}</p>
                                    <button className='list-edit'><i className="fas fa-pencil-alt"></i></button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    const { id } = state
    return {
        id
    };
};

export default connect(mapStateToProps, {updateUser})(Channels);