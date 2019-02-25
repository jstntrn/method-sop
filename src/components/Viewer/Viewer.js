import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import './Viewer.scss'
import ContentDisplay from './../ContentDisplay/ContentDisplay'
import CountDisplay from './../CountDisplay/CountDisplay'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { updateUser } from './../../ducks/reducer'
import { connect } from 'react-redux';

class Viewer extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: '',
            pip: false,
            playing: true,
            controls: false,
            light: false,
            volume: 0.8,
            muted: true,
            played: 0,
            playedSeconds: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false,
            slideLog: [],
            slideCounter: 0,
            pauseTime: 0.00,
            slideTitle: 'Loading',
            newTitle: '',
            showCreate: true,
            projectTitle: '',
            continueHighlight: false,
            slideID: null
        }     
    }

    //add async await to fix duration loading etc.
    async componentDidMount(){
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
        axios.get(`/api/viewer?project=${this.props.match.params.project}`)
        .then(res => {
            this.setState({
                url: res.data[0].video_url,
                projectTitle: res.data[0].title
            })
            axios.get(`https://vimeo.com/api/oembed.json?url=${this.state.url}`)
            .then(res => {
                this.setState({
                    duration: res.data.duration,
                })
                axios.get(`/api/slides/${this.props.match.params.project}`)
                .then(res => {
                    if(res.data.length === 0){
                        const { slideLog, duration } = this.state
                        const newObj = {
                            id: null,
                            title: 'Slide',
                            pause_time: duration
                        }
                        this.setState({
                            slideLog: [...slideLog, newObj],
                            pauseTime: duration,
                            slideTitle: 'Slide',
                            slideID: null
                        })
                    } else {
                        const resSlides = [...res.data]
                        resSlides.sort((a, b) => {
                            return a.pause_time - b.pause_time
                        })
                        this.setState({
                            slideLog: resSlides,
                            pauseTime: resSlides[0].pause_time,
                            slideTitle: resSlides[0].title,
                            slideID: resSlides[0].id
                        })
                    }
                })
            })
        })
        .catch(err => {console.log(err)})
    }

    onStart = () => {
        console.log('onStart')
    }

    handleChange(prop, val){
        this.setState({
            [prop]: val
        })
    }

    playPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    onPlay = () => {
        this.setState({ playing: true })
    }

    onPause = () => {
        this.setState({ playing: false })
    }

    onSeekMouseDown = e => {
        this.setState({ seeking: true })
    }

    onSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
    }

    onSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    onSeek = e => {
        const { slideLog } = this.state;        
        let slideIndex = slideLog.findIndex(slide => {
            return slide.pause_time > e;
        })
        this.setState({
            pauseTime: slideLog[slideIndex].pause_time,
            slideTitle: slideLog[slideIndex].title,
            slideCounter: slideIndex,
            slideID: slideLog[slideIndex].id
        })
    }

    handleSeek = (e) => {
        this.setState({ seeking: true })
        this.setState({ played: parseFloat(e.target.value) })
        this.setState({ 
            seeking: false,
            continueHighlight: false
        })
        this.player.seekTo(parseFloat(e.target.value))
    }

    //played is an object, onProgress is updating state at set intervals and checking if it needs to pause
    onProgress = (played) => {
        if (!this.state.seeking) {
            this.setState(played)
            if (played.playedSeconds > this.state.pauseTime ){
                this.setState({ 
                    playing: false,
                    continueHighlight: true
                })
            }
        }
    }

    onDuration = (duration) => {
        this.setState({
            duration
        })
    }

    addSlide = () => {
        const {slideLog, newTitle, slideCounter} = this.state
        let counter = slideCounter
        const slides = [...slideLog]
        const finalObj = slides.pop();
        const newObj = {id: null, pause_time: this.player.getCurrentTime(), title: newTitle}
        slides.push(newObj, finalObj)
        slides.sort((a, b) => {
            return a.pause_time - b.pause_time
        })
        counter++
        this.setState({
            slideLog: slides,
            newTitle: '',
            slideCounter: counter
        })
    }

    handleZero(){
        const { slideLog } = this.state
        this.setState({
            pauseTime: slideLog[0].pause_time,
            slideTitle: slideLog[0].title,
            slideCounter: 0,
            continueHighlight: false,
            slideID: slideLog[0].id
        })
        this.player.seekTo(0.00)
    }

    handlePrevious(){
        let { slideLog, slideCounter } = this.state
        if(slideCounter > 0){
            slideCounter--
            this.setState({
                pauseTime: slideLog[slideCounter].pause_time,
                slideTitle: slideLog[slideCounter].title,
                slideCounter: slideCounter,
                continueHighlight: false,
                slideID: slideLog[slideCounter].id
            })
            if(slideCounter > 0){
                slideCounter--
                this.player.seekTo(slideLog[slideCounter].pause_time)
            } else {
                this.player.seekTo(0.00)
            }
        }

    }

    //getting issue with pauseTime of undefined sometimes when 
    handleNext(){
        let { slideLog, slideCounter } = this.state
        if(slideCounter < slideLog.length-1){
            this.player.seekTo(slideLog[slideCounter].pause_time)
            slideCounter++
            this.setState({
                pauseTime: slideLog[slideCounter].pause_time,
                slideTitle: slideLog[slideCounter].title,
                slideCounter: slideCounter,
                playing: true,
                continueHighlight: false,
                slideID: slideLog[slideCounter].id
            })
        }

    }

    //when new slide is created jump back a partial second to keep on logical slide
    //need to pass URL and other data from project into viewer
    //extra feature add prompt and tracker if save is necessary
    //need to finish handleSave and get slides at componentDidMount
    handleSave(){
        const { slideLog } = this.state;
        let newLog = slideLog.map( slide => {
            if (slide.id === null){
                axios.post(`/api/slide/${this.props.match.params.project}`, {
                    pause_time: slide.pause_time,
                    title: slide.title
                })
                .then(res => {
                    return {
                        id: res.data.id,
                        pause_time: slide.pause_time,
                        title: slide.title
                    }
                })
            }
            return slide
        })
        newLog.sort((a, b) => {
            return a.pause_time - b.pause_time
        })
        this.setState({
            slideLog: newLog
        })
    }

    toggleCreate = () => {
        this.setState({
            showCreate: !this.state.showCreate
        })
    }

    render () {
        const {url, playing, duration, playedSeconds, pip, controls, light, loop, playbackRate, volume, muted, slideTitle, newTitle, played, showCreate, projectTitle, continueHighlight, slideID} = this.state
        let createInput = (
            <div className='player-footer-right'>
                <input value={newTitle} onChange={(e) => this.handleChange('newTitle', e.target.value)} />
                <button onClick={() => this.addSlide()}>create slide</button>
            </div>
        )
        if (!showCreate){
            createInput = null;
        }
        return(
            <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"/>
                {/* <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"></link> */}
                <link href="https://fonts.googleapis.com/css?family=Do+Hyeon" rel="stylesheet"></link>
                <div>
                    <div className='viewer-header'>
                        <div className='header-left'>
                            <h1 className='logo'>method</h1>
                            <h1 className='logo yel'>sop</h1>
                            <h1 className='proj-title'>|   {projectTitle}</h1>
                        </div>
                        <div className='header-right'>
                        <button className="hamburger" onClick={() => this.toggleCreate()}><i className="fas fa-pencil-alt"></i></button>
                            <button className="hamburger" onClick={() => this.handleSave()} ><i className="far fa-save"></i></button>                          
                            <Link to='/dashboard' style={{ textDecoration: 'none' }}><button className="hamburger"><i className="fas fa-arrow-alt-circle-left"></i></button></Link>                            
                        </div>
                    </div>
                </div>
                <div className='viewer-wrapper'>
                    <div className='fixed-viewer'>
                        <div className='player-header'>
                            <CountDisplay 
                                slideLog={this.state.slideLog}
                                slideCounter={this.state.slideCounter}
                            />
                            <h2>{slideTitle}</h2>
                        </div>
                        <div className='player-container'>
                            <div className='nav-container'>
                                <button className='player-nav center' onClick={() => this.handlePrevious()}><i className="fas fa-angle-left"></i></button>
                                <button className='player-nav lower' onClick={() => this.handleZero()}><i className="fas fa-undo"></i></button>
                            </div>
                            <div className='player-wrapper'>
                                <ReactPlayer
                                    ref={(player) => this.player = player}
                                    className='react-player'
                                    width='700px'
                                    height='394px'
                                    url={url}
                                    pip={pip}
                                    playing={playing}
                                    controls={controls}
                                    light={light}
                                    loop={loop}
                                    playbackRate={playbackRate}
                                    volume={volume}
                                    muted={muted}
                                    onReady={this.onReady}
                                    onStart={this.onStart}
                                    onPlay={this.onPlay}
                                    onEnablePIP={this.onEnablePIP}
                                    onDisablePIP={this.onDisablePIP}
                                    onPause={this.onPause}
                                    onSeek={e => this.onSeek(e)}
                                    onEnded={this.onEnded}
                                    onError={e => console.log('onError', e)}
                                    onProgress={this.onProgress}
                                    onDuration={this.onDuration}
                                />
                            </div>
                            <div className='nav-container'>
                                
                                {
                                    (continueHighlight ? <button className='player-nav center continue' onClick={() => this.handleNext()}><i className="fas fa-angle-right"></i></button>
                                    : <button className='player-nav center' onClick={() => this.handleNext()}><i className="fas fa-angle-right"></i></button>)
                                }
                                <button className='player-nav lower' onClick={this.playPause}>{this.state.playing ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}</button>
                            </div>
                        </div>
                        <div className='player-footer'>
                            <div className='player-footer-left'>
                                <input
                                className = 'progress-bar'
                                type='range' min={0} max={1} step='any'
                                value={played}
                                onMouseDown={this.onSeekMouseDown}
                                onChange={this.onSeekChange}
                                onMouseUp={this.onSeekMouseUp}
                                />
                                <p>{playedSeconds.toFixed(0)}s / </p>
                                <p>{duration}s</p>
                            </div>
                            {createInput}
                        </div>
                    </div>
                    <div className='content-container'>
                        <ContentDisplay className='card-content-body' slideID={slideID} showCreate={showCreate} />
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

export default connect(mapStateToProps, {updateUser})(Viewer)