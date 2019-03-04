import React, { Component } from 'react';
import { updateUser } from './../../ducks/reducer'
import { connect } from 'react-redux';
import VideoCard from './../VideoCard/VideoCard'
import './VideoLibrary.scss'


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

    render(){
        const {videoList} = this.props;
        
        return(
            <div>
                <div className='new-proj-body'>
                    <div className='videos-container'>
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