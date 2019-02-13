import React, { Component } from 'react';
import ReactPlayer from 'react-player';
 
export default class Viewer extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: 'https://www.youtube.com/watch?v=iF2bJ9z__sg',
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
                slideCounter: slideCounter
            })
        }
    }

    render () {
        const {url, playing, duration, played, playedSeconds, pip, controls, light, loop, playbackRate, volume, muted, slideTitle, newTitle} = this.state
        return(
            <div>
                <ReactPlayer
                    ref={(player) => this.player = player}
                    className='react-player'
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
                <button onClick={this.playPause}>{this.state.playing ? 'Pause' : 'Play'}</button>
                <p>{duration}</p>
                <p>{played.toFixed(3)}</p>
                <p>{playedSeconds.toFixed(3)}</p>
                <button onClick={() => this.handleZero()}>seekTo 0.00</button>
                <input value={newTitle} onChange={(e) => this.handleChange('newTitle', e.target.value)} />
                <button onClick={() => this.addSlide()}>new slide</button>
                <p>Title: {slideTitle}</p>
                <button onClick={() => this.handlePrevious()}>previous slide</button>
                <button onClick={() => this.handleContinue()}>continue</button>
                <button onClick={() => this.handleNext()}>next Slide</button>
            </div>
        )
    }
}
