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
                    console.log(res.data)
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
                console.log(res.data)
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
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"/>
                {/* <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"></link> */}
                <link href="https://fonts.googleapis.com/css?family=Do+Hyeon" rel="stylesheet"></link>
                <div className='new-proj-body'>
                    <div className='projects-container'>
                        {
                            (videoList.map(video => (
                                <VideoCard 
                                    key={video.id}
                                    videoURL={video.video_url}
                                    thumbnail={video.thumbnail}
                                    title={video.title}
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