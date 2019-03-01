import React, { Component } from 'react'
import './Dashboard.scss'
import ProjectLibrary from './../ProjectLibrary/ProjectLibrary'
import { connect } from 'react-redux';
import axios from 'axios';
import { updateUser } from './../../ducks/reducer';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            userID: null,
            editing: false,
        }
    }

    componentWillMount(){
        const {id} = this.props;
        if(!id){
            axios.get('./api/user')
            .then(res => {
                this.props.updateUser(res.data);
                this.setState({
                    userID: res.data.id
                })
            })
            .catch(err => {
                this.props.history.push('/');
            })
        } else {
            this.setState({
                userID: id
            })
        }
    }
    
    logout(){
        axios.post('/auth/logout')
        .then(res => {
            this.props.updateUser({});
            this.props.history.push('/');
        })
        .catch(err => {
            console.log(err)
        })
    }

    toggleEdit = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    render(){
            return(
            <div>
                <div className='viewer-header dash'>
                    <div className='header-left'>
                        <h1 className='logo'>method</h1>
                        {/* <h1 className='logo yel'>sop</h1> */}
                        <h1 className='dash-title'>|   Dashboard</h1>
                    </div>
                    <div className='header-right'>
                        <OverlayTrigger placement='bottom' overlay={<Tooltip id={`tooltip-bottom`} className='trigger'>New Project</Tooltip>}>
                            <Link to='/newproject' style={{ textDecoration: 'none'}}><button className="hamburger"><i className="fas fa-plus"></i></button></Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement='bottom' overlay={<Tooltip id={`tooltip-bottom`} className='trigger'>Edit Project Cards</Tooltip>}>
                            <button className="hamburger" onClick={() => this.toggleEdit()}><i className="fas fa-pencil-alt"></i></button>
                        </OverlayTrigger>
                        <OverlayTrigger placement='bottom' overlay={<Tooltip id={`tooltip-bottom`} className='trigger'>Video Manager</Tooltip>}>
                            <Link to='/videos' style={{ textDecoration: 'none'}}><button className="hamburger"><i className="fas fa-video"></i></button></Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement='bottom' overlay={<Tooltip id={`tooltip-bottom`} className='trigger'>Channel Manager</Tooltip>}>
                            <Link to='/channels' style={{ textDecoration: 'none'}}><button className="hamburger"><i className="fas fa-folder-open"></i></button></Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement='bottom' overlay={<Tooltip id={`tooltip-bottom`} className='trigger'>Account Settings</Tooltip>}>
                            <Link to='/account' style={{ textDecoration: 'none'}}><button className="hamburger"><i className="fas fa-cog"></i></button></Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement='bottom' overlay={<Tooltip id={`tooltip-bottom`} className='trigger'>Logout</Tooltip>}>
                            <button className="hamburger" onClick={() => this.logout()}><i className="fas fa-sign-out-alt"></i></button>
                        </OverlayTrigger>
                    </div>
                </div>
                <div className='dash-body'>
                    {/* {
                        (this.state.userID ? <ProjectLibrary userID={this.state.userID} editing={this.state.editing} />
                        : <div>Loading</div>)
                    } */}
                    <ProjectLibrary userID={this.state.userID} editing={this.state.editing} toggleEdit={this.toggleEdit} />
                    
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

export default connect(mapStateToProps, {updateUser})(Dashboard)