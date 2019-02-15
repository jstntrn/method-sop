import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { updateUser } from './../../ducks/reducer'
import { connect } from 'react-redux';
import './NewProject.css'

class NewProject extends Component{
    constructor(props){
        super(props);
        this.state = {
            projectTitle: '',
            videoID: null,
            videoURL: '',
            videoImage: '',
            videoTitle: '',
            showVideo: false,
            confirmed: false,
            userID: null
        }
    }
    
    componentWillMount(){
        const {id} = this.props;
        if(!id){
            axios.get('./api/user')
            .then(res => {
                this.props.updateUser(res.data);
                this.setState({
                    userID: id
                })
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
        //create button on URL input to invoke
        //do api request to vimeo to pull data and set state
        //display video and title on new project screen
        this.setState({
            videoURL: val
        })
        // const { videoURL } = this.state
        axios.get(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/121583246`)
        .then(res => {
            this.setState({
                videoTitle: res.data.title,
                videoImage: res.data.thumbnail_url,
                showVideo: true
            })
        })
        .catch(err => {console.log(err)})
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

    //add get request to pull projects for user in dashboard(Project Library componentDidMount)
    //finish code, await, async, and endpoints
    createProject () {
        //next button is invoked and prject data is posted to table
        //routed to viewer which pulls project id data
        const { projectTitle, videoID, userID, videoImage } = this.state;
        axios.post('/api/project', {
            video_id: videoID,
            user_id: userID,
            title: projectTitle,
            image_url: videoImage
        })
    }

    render(){
        const { projectTitle, videoURL, videoImage, videoTitle, showVideo, confirmed} = this.state;

        let currentVid = (
            <div>
                <img src={videoImage} alt='video thumbnail' />
                <h2>{videoTitle}</h2>
                <div>
                    {confirmed ? <i className="fas fa-thumbs-up" style={{color: '#FFBD00', fontSize: '50px'}}></i>
                    : <button className='vid-confirm' onClick={() => this.confirmVideo()} disabled={ confirmed === 'true' }><i className="fas fa-check"></i></button>}
                </div>
            </div>
        )
        if(!showVideo){
            currentVid = null;
        }

        let nextBut = (
            <div>
                {confirmed && projectTitle ? <Link to='/viewer' style={{ textDecoration: 'none' }}><button className="new-next" onClick={() => this.createProject()} disabled={ confirmed === 'false' }><i className="fas fa-arrow-right"></i></button></Link>
                : <div></div>}
            </div>
        )
        

        return(
            <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"/>
                {/* <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"></link> */}
                <link href="https://fonts.googleapis.com/css?family=Do+Hyeon" rel="stylesheet"></link>
                <div className='header viewer-header dash'>
                    <div className='header-left'>
                        <h1 className='logo'>method</h1>
                        <h1 className='logo yel'>sop</h1>
                        <h1 className='dash-title'>|   New Project</h1>
                    </div>
                    <div className='header-right'>
                        <Link to='/dashboard' style={{ textDecoration: 'none' }}><button className="hamburger"><i className="fas fa-arrow-alt-circle-left"></i></button></Link>  
                    </div>
                </div>
                <div className='new-proj-body'>
                    <div className='new-proj-input-wrapper'>
                        <h2>Project Title</h2>
                        <input className='new-proj-input' value={projectTitle} onChange={(e) => this.handleChange('projectTitle', e.target.value)} />
                        <h2>Video URL</h2>
                        <input className='new-proj-input' value={videoURL} onChange={(e) => this.handleURL(e.target.value)} />
                        {nextBut}
                    </div>
                    {currentVid}
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