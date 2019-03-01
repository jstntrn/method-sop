import React, { Component } from 'react';
import axios from 'axios';
import { updateUser } from './../../ducks/reducer'
import { connect } from 'react-redux';
import VideoCard from './../VideoCard/VideoCard'
import './../ProjectLibrary/ProjectLibrary.scss'

class VideoLibrary extends Component{
    constructor(props){
        super(props);
        this.state = {
            videoID: null,
            videoURL: '',
            videoImage: '',
            videoTitle: '',
            showVideo: false,
            vidAdded: false,
            userID: null,
            videoList: []
        }
    }

    componentWillMount(){
        const {id} = this.props;
        if(!id){
            axios.get('./api/user')
            .then(res => {
                this.props.updateUser(res.data);
                axios.get(`/api/videos/${res.data.id}`)
                .then(res => {
                    this.setState({
                        videoList: res.data,
                        userID: res.data.user_id
                    })
                })
            })
            .catch(err => {
                this.props.history.push('/');
            })
        } else {
            axios.get(`/api/videos/${id}`)
            .then(res => {
                this.setState({
                    videoList: res.data
                })
            })
        }
        this.setState({
            userID: id
        })
    }

    componentDidMount(){
        const {id} = this.props;
        this.setState({
            userID: id
        })
    }

    render(){
        const {videoList} = this.state;
        
        return(
            <div>
                <div className='new-proj-body'>
                    <div className='projects-container'>
                        {
                            (videoList.map(video => (
                                <VideoCard 
                                    key={video.id}
                                    videoURL={video.video_url}
                                    thumbnail={video.thumbnail}
                                    title={video.title}
                                    handleURL={this.props.handleURL}
                                    page={this.props.page}
                                />
                            )))
                        }
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

export default connect(mapStateToProps, {updateUser})(VideoLibrary)