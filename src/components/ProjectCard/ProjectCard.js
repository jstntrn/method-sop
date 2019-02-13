import React from 'react'
import './ProjectCard.css'

export default function ProjectCard(props){
    const { title, image_URL } = props
    return(
        <div className='proj-card-wrapper'>
            <img src={image_URL} alt='project' />
            <h2>{title}</h2>
        </div>
    )
}