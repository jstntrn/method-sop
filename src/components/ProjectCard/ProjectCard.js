import React from 'react'
import './ProjectCard.css'
import { Link } from 'react-router-dom'

export default function ProjectCard(props){
    const { title, image_URL } = props
    return(
        <div className='proj-card-wrapper'>
            <Link to='/viewer' style={{ textDecoration: 'none', color: '#565761' }}>
                <img src={image_URL} alt='project' />
                <h2 className='card-title'>{title}</h2>
            </Link>
        </div>
    )
}