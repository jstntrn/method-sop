import React, { Component } from 'react'
import './../ProjectCard/ProjectCard.scss'
import './VideoCard.scss'

export default class VideoCard extends Component{

    submitURL(){
        const { videoURL, handleURL} = this.props;
        handleURL(videoURL)
    }

    render(){
        const { page, videoURL, thumbnail, title } = this.props
        return(
            <div className='vid-card-wrapper'>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"/>
                {/* <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"></link> */}
                <div>
                    <div className='vid-image-wrapper'>
                        <img className='proj-image' src={thumbnail} alt='project' />
                        {
                            ( page === '/newproject' ?
                            <div className='image-overlay'>
                                <button className='vid-button' onClick={() => {this.submitURL()}}><i className="fas fa-plus"></i></button>
                                <a className='vid-button' href={videoURL} target='_blank' rel='noopener noreferrer' style={{ textDecoration: 'none', color: 'black'}}><i className="fas fa-link"></i></a>
                            </div>
                            :
                            <div className='image-overlay'>
                                <a className='vid-button' href={videoURL} target='_blank' rel='noopener noreferrer' style={{ textDecoration: 'none', color: 'black'}}><i className="fas fa-link"></i></a>
                            </div>
                            )
                        }
                    </div>
                    <div className='proj-title-wrapper'>
                        <h3 className='proj-card-title'>{title}</h3>
                    </div>
                </div>
            </div>
        )
    }
}