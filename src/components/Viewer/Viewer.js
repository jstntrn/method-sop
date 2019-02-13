import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import './Viewer.css'
import ContentDisplay from './../ContentDisplay/ContentDisplay'
import CountDisplay from './../CountDisplay/CountDisplay'
 
export default class Viewer extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: 'https://www.youtube.com/watch?v=ltCF1QNaLlo',
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
            pauseTime: 5.00, //set to duration at startup componentDidMount
            slideTitle: 'Test Title',
            newTitle: ''
        }     
    }

    handleChange(prop, val){
        this.setState({
            [prop]: val
        })
    }

    onStart = () => {
        const { slideLog, duration } = this.state
        const newObj = {
            pauseTime: duration,
            slideTitle: 'Slide'
        }
        this.setState({
            slideLog: [...slideLog, newObj],
            pauseTime: duration,
            slideTitle: 'Slide'
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

    handleSeek = (e) => {
        this.setState({ seeking: true })
        this.setState({ played: parseFloat(e.target.value) })
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    //played is an object, onProgress is updating state at set intervals and checking if it needs to pause
    onProgress = (played) => {
        if (!this.state.seeking) {
            this.setState(played)
            if (played.playedSeconds > this.state.pauseTime ){
                this.setState({ playing: false })
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
        const newObj = {slideTitle: newTitle, pauseTime: this.player.getCurrentTime()}
        slides.push(newObj, finalObj)
        slides.sort((a, b) => {
            return a.pauseTime - b.pauseTime
        })
        counter++
        this.setState({
            slideLog: slides,
            newTitle: '',
            slideCounter: counter
        })
    }

    handleContinue(){
        let { slideCounter, slideLog } = this.state
        slideCounter++
        this.setState({
            pauseTime: slideLog[slideCounter].pauseTime,
            slideTitle: slideLog[slideCounter].slideTitle,
            slideCounter: slideCounter
        })
        this.setState({ playing: true })
    }

    handleZero(){
        const { slideLog } = this.state
        this.setState({
            pauseTime: slideLog[0].pauseTime,
            slideTitle: slideLog[0].slideTitle,
            slideCounter: 0
        })
        this.player.seekTo(0.00)
    }

    handlePrevious(){
        let { slideLog, slideCounter } = this.state
        if(slideCounter > 0){
            slideCounter--
            this.setState({
                pauseTime: slideLog[slideCounter].pauseTime,
                slideTitle: slideLog[slideCounter].slideTitle,
                slideCounter: slideCounter
            })
            if(slideCounter > 0){
                slideCounter--
                this.player.seekTo(slideLog[slideCounter].pauseTime)
            } else {
                this.player.seekTo(0.00)
            }
        }
    }

    handleNext(){
        let { slideLog, slideCounter } = this.state
        if(slideCounter < slideLog.length-1){
            this.player.seekTo(slideLog[slideCounter].pauseTime)
            slideCounter++
            this.setState({
                pauseTime: slideLog[slideCounter].pauseTime,
                slideTitle: slideLog[slideCounter].slideTitle,
                slideCounter: slideCounter,
                playing: true
            })
        }
    }

    render () {
        const {url, playing, duration, playedSeconds, pip, controls, light, loop, playbackRate, volume, muted, slideTitle, newTitle} = this.state
        return(
            <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous"/>
                <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"></link>
                <link href="https://fonts.googleapis.com/css?family=Do+Hyeon" rel="stylesheet"></link>
                <div className='fixed-viewer'>
                    <div className='header viewer-header'>
                        <div className='header-left'>
                            <h1 className='logo'>method</h1>
                            <h1 className='logo yel'>sop</h1>
                            <h1 className='proj-title'>|   Project Title</h1>
                        </div>
                        <div className='header-right'>
                            <button className="hamburger"><i className="fas fa-bars"></i></button>
                        </div>
                    </div>
                    <div className='player-header'>
                        <CountDisplay 
                            slideLog={this.state.slideLog}
                            slideCounter={this.state.slideCounter}
                        />
                        <h2>{slideTitle}</h2>
                    </div>
                    <div className='player-container'>
                        <div className='nav-container'>
                            <button className='player-nav center' onClick={() => this.handlePrevious()}><i class="fas fa-angle-left"></i></button>
                            <button className='player-nav lower' onClick={() => this.handleZero()}><i class="fas fa-undo"></i></button>
                        </div>
                        <div className='player-wrapper'>
                            <ReactPlayer
                                ref={(player) => this.player = player}
                                className='react-player'
                                width='800px'
                                height='450px'
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
                                onSeek={e => console.log('onSeek', e)}
                                onEnded={this.onEnded}
                                onError={e => console.log('onError', e)}
                                onProgress={this.onProgress}
                                onDuration={this.onDuration}
                            />
                        </div>
                        <div className='nav-container'>
                            <button className='player-nav center' onClick={() => this.handleNext()}><i class="fas fa-angle-right"></i></button>
                            <button className='player-nav lower' onClick={this.playPause}>{this.state.playing ? <i class="fas fa-pause"></i> : <i class="fas fa-play"></i>}</button>
                        </div>
                    </div>
                    <div className='player-footer'>
                        {/* add slider seeker */}
                        <p>{playedSeconds.toFixed(0)}s / </p>
                        <p>{duration}s</p>
                        <input value={newTitle} onChange={(e) => this.handleChange('newTitle', e.target.value)} />
                        <button onClick={() => this.addSlide()}>create slide</button>
                    </div>
                </div>
                <div className='content-container'>
                    <ContentDisplay className='card-content-body'/>
                </div>
            </div>
        )
    }
}
