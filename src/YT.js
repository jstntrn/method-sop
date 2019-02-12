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
            timestamps: [],
            resume: false

        }     
    }

    //need to add duration as final array element

    playPause = () => {
        this.setState({ playing: !this.state.playing })
        console.log(this.state)
    }

    onPlay = () => {
        console.log('onPlay')
        this.setState({ playing: true })
    }

    onPause = () => {
        console.log('onPause')
        this.setState({ playing: false })
    }

    onSeek = () => {

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
            if (played.playedSeconds > 5.00 ){
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
        const {timestamps} = this.state
        const newArr = [...timestamps, this.player.getCurrentTime()]
        this.setState({
            timestamps: newArr
        })
    }
  

    render () {
        const {url, playing, duration, played, playedSeconds, timestamps, pip, controls, light, loop, playbackRate, volume, muted} = this.state
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
                <p>timestamps {timestamps}</p>
                <button onClick={() => this.addStamp()}>log time</button>
            </div>
        )
    }
}
