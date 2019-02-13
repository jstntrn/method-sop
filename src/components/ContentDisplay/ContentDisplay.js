import React, { Component } from 'react'
import ContentCard from './../ContentCard/ContentCard'
import './ContentDisplay.css'

export default class ProjectLibrary extends Component{
    constructor(props){
        super(props)

        this.state = {
            contentList: [
                {content_id: 1, type: 'INSTRUCTIONS', content: 'Use the arrows to navigate the slides. Use the restart button to jump to the beginning of the video. Use the play/pause button to pause the video. Use the create slide input to create a slide with a new title.'},
                {content_id: 2, type: 'PARTS', content: 'Use the arrows to navigate the slides. Use the restart button to jump to the beginning of the video. Use the play/pause button to pause the video. Use the create slide input to create a slide with a new title.'},
                {content_id: 3, type: 'TOOLS', content: 'Use the arrows to navigate the slides. Use the restart button to jump to the beginning of the video. Use the play/pause button to pause the video. Use the create slide input to create a slide with a new title.'},
                {content_id: 4, type: 'MECHANICAL DRAWINGS', content: 'Use the arrows to navigate the slides. Use the restart button to jump to the beginning of the video. Use the play/pause button to pause the video. Use the create slide input to create a slide with a new title.'},
                {content_id: 5, type: 'ELECTRICAL SCHEMATICS', content: 'Use the arrows to navigate the slides. Use the restart button to jump to the beginning of the video. Use the play/pause button to pause the video. Use the create slide input to create a slide with a new title.'},
            ]
        }
    }

    render(){
        return(
            <div className='projects-container'>
                {
                    this.state.contentList.map(content => (
                        <ContentCard
                            key={content.content_id}
                            type={content.type}
                            content={content.content}
                        />
                    ))
                }
            </div>
        )
    }
}
