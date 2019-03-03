import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import { updateUser } from './../../ducks/reducer'
import { connect } from 'react-redux';
import './NewProject.scss'
import VideoLibrary from '../VideoLibrary/VideoLibrary';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


//problems to fix: video control functions weren't working with projectID 50, also new the projectID needs to be set before link is clicked

class NewProject extends Component{
    constructor(props){
        super(props);
        this.state = {
            projectTitle: '',
            projectID: 50,
            videoID: null,
            videoURL: '',
            videoImage: '',
            videoTitle: '',
            showVideo: false,
            confirmed: false,
            userID: null,
            projectCreated: false,
            channel: 'default',
            channelID: null,
            channelList: [],
            videoList: []
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
                        channelList: res.data,
                        channelID: res.data[0].id,
                        channel: res.data[0].name
                    })
                })
                axios.get(`/api/videos/${this.props.id}`)
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
            this.setState({
                userID: id
            })
            axios.get(`/api/channels/${this.props.id}`)
            .then(res => {
                this.setState({
                    channelList: res.data,
                    channelID: res.data[0].id,
                    channel: res.data[0].name
                })
            })
            axios.get(`/api/videos/${this.props.id}`)
            .then(res => {
                this.setState({
                    videoList: res.data,
                    userID: res.data.user_id
                })
            })
        }
        this.setState({
            userID: id
        })
    }

    channelUpdate (val) {
        this.setState({
            channelID: val
        })
    }

    handleChange (prop, val) {
        this.setState({
            [prop]: val
        })
    }

    handleURL = (val) => {
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

    //add get request to pull projects for user in dashboard(Project Library componentDidMount)
    //finish code, await, async, and endpoints
    createProject () {
        //next button is invoked and prject data is posted to table
        //routed to viewer which pulls project id data
        const { projectTitle, videoID, videoImage, channelID } = this.state;
        axios.post('/api/project', {
            video_id: videoID,
            title: projectTitle,
            image_url: videoImage,
            channel_id: channelID
        })
        .then(res => {
            this.setState({
                projectID: res.data[0].id,
            })
            this.setState({
                projectCreated: true
            })
        })
    }

    render(){
        const { projectTitle, videoURL, videoImage, videoTitle, showVideo, confirmed, projectCreated, videoList} = this.state;

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
        if (projectCreated === true){
            return <Redirect to={`/viewer/${this.state.projectID}`}/>
        }

        let nextBut = (
            <div>
                {confirmed && projectTitle ? <button className="new-next" onClick={() => this.createProject()} disabled={ confirmed === 'false' }><i className="fas fa-arrow-right"></i></button>
                : <div></div>}
            </div>
        )
        

        return(
            <div>
                <div className='viewer-header dash'>
                    <div className='header-left'>
                        <h1 className='logo'>method</h1>
                        {/* <h1 className='logo yel'>sop</h1> */}
                        <h1 className='dash-title'>|   New Project</h1>
                    </div>
                    <div className='header-right'>
                        <OverlayTrigger placement='left' overlay={<Tooltip id={`tooltip-bottom`} className='trigger'>Dashboard</Tooltip>}>
                            <Link to='/dashboard' style={{ textDecoration: 'none' }}><button className="hamburger"><i className="fas fa-arrow-alt-circle-left"></i></button></Link>
                        </OverlayTrigger>  
                    </div>
                </div>
                <div className='new-proj-body'>
                    <div className='new-proj-input-wrapper'>
                        <h2>Channel</h2>
                        <select className='new-proj-input' name='type' onChange={(e) => this.channelUpdate(e.target.value)} >
                            {
                                this.state.channelList.map((channel, index) => (
                                    <option value={channel.id} key={index}>{channel.name}</option>
                                ))
                            }
                        </select>
                        <h2>Project Title</h2>
                        <input className='new-proj-input' value={projectTitle} onChange={(e) => this.handleChange('projectTitle', e.target.value)} />
                        <h2>Vimeo URL</h2>
                        <input className='new-proj-input' value={videoURL} onChange={(e) => this.handleURL(e.target.value)} />
                        {nextBut}
                    </div>
                    {currentVid}
                    <div className='video-lib-wrapper'>
                        <h2>Video Library</h2>
                        <VideoLibrary handleURL={this.handleURL} page={this.props.match.path} videoList={videoList} />
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