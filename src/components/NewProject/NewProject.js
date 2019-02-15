import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { updateUser } from './../../ducks/reducer'
import { connect } from 'react-redux';
import './NewProject.css'

class NewProject extends Component{
    constructor(props){
        super(props);
        this.state = {}
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

    render(){
        return(
            <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous"/>
                <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"></link>
                <link href="https://fonts.googleapis.com/css?family=Do+Hyeon" rel="stylesheet"></link>
                <div className='header viewer-header dash'>
                    <div className='header-left'>
                        <h1 className='logo'>method</h1>
                        <h1 className='logo yel'>sop</h1>
                        <h1 className='dash-title'>|   New Project</h1>
                    </div>
                    <div className='header-right'>
                        <Link to='/dashboard' style={{ textDecoration: 'none' }}><button className="hamburger"><i class="fas fa-arrow-alt-circle-left"></i></button></Link>  
                    </div>
                </div>
                <div className='new-proj-body'>
                    <div className='new-proj-input-wrapper'>
                        <h2>Project Title</h2>
                        <input className='new-proj-input' />
                        <h2>Video URL</h2>
                        <input className='new-proj-input' />
                        <Link to='/viewer' style={{ textDecoration: 'none' }}><button className="new-next"><i class="fas fa-arrow-right"></i></button></Link>
                    </div>
                    <div className='video-lib-wrapper'>
                        <h2>Video Library</h2>
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

export default connect(mapStateToProps, {updateUser})(NewProject);