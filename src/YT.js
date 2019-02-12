import React, { Component } from 'react';
import ReactPlayer from 'react-player';
 
export default class YT extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: 'https://www.youtube.com/watch?v=QUDml-V0WLI',
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
            slideLog: [
                        {slideTitle: 'Slide 1', pauseTime: 5.00},
                        {slideTitle: 'Slide 2', pauseTime: 10.00},
                        {slideTitle: 'Slide 3', pauseTime: 20.00},
                        {slideTitle: 'Slide 4', pauseTime: 146.00}
                    ],
            slideCounter: 0,
            // prevPause: 0.00,
            // prevTitle: 'Prev Title',
            pauseTime: 5.00, //set to duration at startup componentDidMount
            slideTitle: 'Test Title',
            // nextPause: 20.00,
            // nextTitle: 'Future Title'
        }     
    }

    //slide section build
    //need array of objects that have title, pauseTime, 
    //display title
    //update pause and title state on slide change
    //button navigate to slide (next/prev object in array)
    //need to add duration as final array element or have setState condition to set pause time to duration to prevent video to stay paused before end of video

    componentDidMount(){
        const { slideLog } = this.state
        console.log(slideLog)
        this.setState({
            pauseTime: slideLog[0].pauseTime,
            slideTitle: slideLog[0].slideTitle
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

    addStamp = () => {
        const {slideLog} = this.state
        const newObj = {slideTitle: 'Added Slide', pauseTime: this.player.getCurrentTime()}
        const newArr = [...slideLog, newObj]
        this.setState({
            slideLog: newArr
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

    //add handlePrevious that seeks back to start time of previous slide(end time of two slides back), setsState, and plays video
    // handlePrevious(){
    //     this.player.seekTo(0.00)
    //     this.setState({
    //         pauseTime: this.state.prevPause,
    //         slideTitle: this.state.prevTitle
    //     })
    //     this.setState({ playing: true })
    // }

    // handleNext(){
    //     this.player.seekTo(this.state.pauseTime)
    //     this.setState({
    //         pauseTime: this.state.nextPause,
    //         slideTitle: this.state.nextTitle
    //     })
    //     this.setState({ playing: true })
    // }
  

    render () {
        const {url, playing, duration, played, playedSeconds, pip, controls, light, loop, playbackRate, volume, muted, slideTitle} = this.state
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
                    onReady={() => console.log('onReady')}
                    onStart={() => console.log('onStart')}
                    onPlay={this.onPlay}
                    onEnablePIP={this.onEnablePIP}
                    onDisablePIP={this.onDisablePIP}
                    onPause={this.onPause}
                    onBuffer={() => console.log('onBuffer')}
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
                <button onClick={() => this.player.seekTo(0.00)}>seekTo 0.00</button>
                <button onClick={() => this.addStamp()}>log time</button>
                <p>Title: {slideTitle}</p>
                {/* <button onClick={() => this.handlePrevious()}>previous slide</button> */}
                <button onClick={() => this.handleContinue()}>continue</button>
                {/* <button onClick={() => this.handleNext()}>next Slide</button> */}
            </div>
        )
    }
}
