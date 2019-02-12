import React, { Component } from 'react';
import ReactPlayer from 'react-player';
 
class YT extends Component {
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
            loop: false
        }
        
    }

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

    onProgress = (played) => {
        console.log(this.state.played)
        if (!this.state.seeking) {
            this.setState(played)
        }
    }

    onDuration = (duration) => {
        this.setState({
            duration
        })
    }


    

    render () {
        const {url, playing, duration, playedSeconds} = this.state
        return(
            <div>
                <ReactPlayer
                    url={url}
                    playing={playing}
                    onProgress={this.onProgress}
                    onDuration={this.onDuration}
                    onSeek={e => console.log('onSeek', e)}
                    ref={(player) => this.player = player}
                />
                <button onClick={this.playPause}>{this.state.playing ? 'Pause' : 'Play'}</button>
                <p>{duration}</p>
                <p>{playedSeconds.toFixed(3)}</p>
                <button onClick={() => this.player.seekTo(0.00)}>seekTo</button>
            </div>
        )
    }
}

export default YT;