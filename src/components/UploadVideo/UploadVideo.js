import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { updateUser } from './../../ducks/reducer'
import { connect } from 'react-redux';

class UploadVideo extends Component{
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

    render(){
        return(
            <div>
                <div className='header viewer-header dash'>
                    <div className='header-left'>
                        <h1 className='logo'>method</h1>
                        {/* <h1 className='logo yel'>sop</h1> */}
                        <h1 className='dash-title'>|   Upload Video</h1>
                    </div>
                    <div className='header-right'>
                        <Link to='/library' style={{ textDecoration: 'none' }}><button className="hamburger"><i className="fas fa-arrow-alt-circle-left"></i></button></Link>  
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

export default connect(mapStateToProps, {updateUser})(UploadVideo);