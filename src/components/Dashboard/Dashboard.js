import React, { Component } from 'react'
import './Dashboard.css'
import ProjectLibrary from './../ProjectLibrary/ProjectLibrary'
import { connect } from 'react-redux';
import axios from 'axios';
import { updateUser } from './../../ducks/reducer'
import { Link } from 'react-router-dom'

class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount(){
        const {id} = this.props;
        if(!id){
            //double check sessions
            axios.get('./api/user')
            .then(res => {
                //dont move
                //add to redux
                this.props.updateUser(res.data);
            })
            .catch(err => {
                //boot to other page
                this.props.history.push('/');
            })
        } else {
            // dont move
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

    render(){
        return(
            <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"/>
                <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"></link>
                <link href="https://fonts.googleapis.com/css?family=Do+Hyeon" rel="stylesheet"></link>
                <div className='header viewer-header dash'>
                    <div className='header-left'>
                        <h1 className='logo'>method</h1>
                        <h1 className='logo yel'>sop</h1>
                        <h1 className='dash-title'>|   Dashboard</h1>
                    </div>
                    <div className='header-right'>
                        <Link to='/newproject' style={{ textDecoration: 'none'}}><button className="hamburger"><i className="fas fa-plus"></i></button></Link>
                        <Link to='/library' style={{ textDecoration: 'none'}}><button className="hamburger"><i className="fas fa-video"></i></button></Link>
                        <Link to='/account' style={{ textDecoration: 'none'}}><button className="hamburger"><i className="fas fa-user"></i></button></Link>
                        <button className="hamburger" onClick={() => this.logout()}><i className="fas fa-sign-out-alt"></i></button>
                    </div>
                </div>
                <div className='dash-body'>
                    <ProjectLibrary />
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