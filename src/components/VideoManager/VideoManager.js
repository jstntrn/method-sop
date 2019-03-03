import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { updateUser } from './../../ducks/reducer'
import { connect } from 'react-redux';
import VideoLibrary from './../VideoLibrary/VideoLibrary'
import './../ProjectLibrary/ProjectLibrary.scss'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


class VideoManager extends Component{
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
            })
            .catch(err => {
                this.props.history.push('/');
            })
        } else {
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

    handleChange (prop, val) {
        this.setState({
            [prop]: val
        })
    }

    handleURL (val) {
        this.setState({
            videoURL: val
        })
        if(val.includes('vimeo')){
            axios.get(`https://vimeo.com/api/oembed.json?url=${val}`)
            .then(res => {
                this.setState({
                    videoTitle: res.data.title,
                    videoImage: res.data.thumbnail_url,
                    showVideo: true
                })
            })
            .catch(err => {console.log(err)})
        } else if (val.includes('youtube')){
            this.setState({
                showVideo: true
            })
        } else {
            alert('Please enter a vimeo or youtube URL')
        }
    }

    confirmVideo () {
        //**** fix userID load time null value
        //have confirm video button appear
        //if yes, post video to video table and show next button
        const { videoURL, videoTitle, videoImage, userID } = this.state;
        axios.post('/api/video', {
            videoURL,
            videoTitle,
            videoImage,
            userID
        })
        .then(res => {
            this.setState({
                videoID: res.data[0].id,
                confirmed: true
            })
        })
    }

    render(){
        const { videoURL, videoImage, videoTitle, showVideo, confirmed, vidAdded } = this.state;
        
        let currentVid = (
            <div>
                <img src={videoImage} alt='video thumbnail' />
                <h2>{videoTitle}</h2>
                <div>
                    {vidAdded ? <i className="fas fa-thumbs-up" style={{color: '#FFBD00', fontSize: '50px'}}></i>
                    : <button className='vid-confirm' onClick={() => this.confirmVideo()} disabled={ confirmed === 'true' }><i className="fas fa-check"></i></button>}
                </div>
            </div>
        )
        if(!showVideo){
            currentVid = null;
        }
        
        return(
            <div>
                <div className='header viewer-header dash'>
                    <div className='header-left'>
                        <h1 className='logo'>method</h1>
                        {/* <h1 className='logo yel'>sop</h1> */}
                        <h1 className='dash-title'>|   Video Manager</h1>
                    </div>
                    <div className='header-right'>
                        {/* <OverlayTrigger placement='bottom' overlay={<Tooltip id={`tooltip-bottom`} className='trigger'>Upload Video</Tooltip>}>
                            <Link to='/upload' style={{ textDecoration: 'none'}}><button className="hamburger"><i className="fas fa-upload"></i></button></Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement='bottom' overlay={<Tooltip id={`tooltip-bottom`} className='trigger'>Edit Videos</Tooltip>}>
                            <button className="hamburger"><i className="fas fa-pencil-alt"></i></button>
                        </OverlayTrigger>                         */}
                        <OverlayTrigger placement='left' overlay={<Tooltip id={`tooltip-bottom`} className='trigger'>Dashboard</Tooltip>}>
                            <Link to='/dashboard' style={{ textDecoration: 'none' }}><button className="hamburger"><i className="fas fa-arrow-alt-circle-left"></i></button></Link>
                        </OverlayTrigger>  
                    </div>
                </div>
                <div className='new-proj-body'>
                    <div className='new-proj-input-wrapper'>
                        <h2>Add Video with Vimeo URL</h2>
                        <input className='new-proj-input' value={videoURL} onChange={(e) => this.handleURL(e.target.value)} />
                        {/* {nextBut} */}
                    </div>
                    {currentVid}
                    <div className='projects-container'>
                        <VideoLibrary />
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

export default connect(mapStateToProps, {updateUser})(VideoManager)