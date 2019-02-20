import React from 'react'
import './ContentCard.css'
import { Link } from 'react-router-dom'

export default function ContentCard(props){
    const { title, content } = props
    return(
        <div className='cont-card-wrapper'>
            <Link to='/viewer' style={{ textDecoration: 'none', color: '#565761' }}>
                <h3>{title}</h3>
                <p className='content-text'>{content}</p>
            </Link>
        </div>
    )
}