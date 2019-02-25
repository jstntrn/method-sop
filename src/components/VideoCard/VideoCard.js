import React, { Component } from 'react'
import './../ProjectCard/ProjectCard.scss'

export default class VideoCard extends Component{
    // constructor(props){
    //     super(props)
    // }

    render(){
        const { videoURL, thumbnail, title } = this.props
        return(
            <div className='proj-card-wrapper'>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"/>
                {/* <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"></link> */}
                <div>
                    <a href={videoURL} target='_blank' rel='noopener noreferrer' style={{ textDecoration: 'none', color: 'black'}}>
                        <img className='proj-image' src={thumbnail} alt='project' />
                        <div className='proj-title-wrapper'>
                            <h3 className='proj-card-title'>{title}</h3>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}