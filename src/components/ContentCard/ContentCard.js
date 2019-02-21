import React, {Component} from 'react'
import './ContentCard.css'
import axios from 'axios'

export default class ContentCard extends Component{

    handleDelete(){
        const { id, updateDisplay } = this.props
        axios.delete(`/api/content/${id}`)
        .then(res => {
            updateDisplay()
        })
    }

    render(){
        const { title, content, showCreate } = this.props
        return(
            <div className='cont-card-wrapper'>
                <div style={{ textDecoration: 'none', color: '#565761' }}>
                    {
                        ( showCreate ? <button className='content-delete' onClick={() => this.handleDelete()}><i className="fa fa-trash" aria-hidden="true"></i></button> : <div></div>)
                    }
                    <h3 className='content-title'>{title}</h3>
                    <p className='content-text'>{content}</p>
                </div>
            </div>
        )
    }
}