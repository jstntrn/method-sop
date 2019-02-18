import React from 'react'
import './ProjectCard.css'
import { Link } from 'react-router-dom'

export default function ProjectCard(props){
    const { title, image_URL, project_id, editing, deleteProjFn } = props

    

    return(
        <div className='proj-card-wrapper'>
            <Link to={`/viewer/${project_id}`} style={{ textDecoration: 'none', color: '#565761' }}>
                <img className='proj-image' src={image_URL} alt='project' />
                <div className='proj-title-wrapper'>
                    <h3 className='proj-card-title'>{title}</h3>
                </div>
            </Link>
            {
                (editing ? <button className='proj-delete' onClick={() => deleteProjFn(project_id)}><i className="fa fa-trash" aria-hidden="true"></i></button> : <div></div>)
            }
            
        </div>
    )
}