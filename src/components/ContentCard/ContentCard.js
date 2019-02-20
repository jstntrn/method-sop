import React, {Component} from 'react'
import './ContentCard.css'
import axios from 'axios'

export default class ContentCard extends Component{

    constructor(props){
        super(props)
    }

    handleDelete(){
        const { id, updateDisplay } = this.props
        axios.delete(`/api/content/${id}`)
        .then(res => {
            updateDisplay()
        })
    }

    render(){
        const { title, content } = this.props
        return(
            <div className='cont-card-wrapper'>
                <div style={{ textDecoration: 'none', color: '#565761' }}>
                    <button onClick={() => this.handleDelete()}><i className="fa fa-trash" aria-hidden="true"></i></button>
                    <h3>{title}</h3>
                    <p className='content-text'>{content}</p>
                </div>
            </div>
        )
    }
}