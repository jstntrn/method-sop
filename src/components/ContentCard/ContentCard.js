import React, {Component} from 'react'
import './ContentCard.scss'
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
        const { type, title, content, showCreate } = this.props
        let cardBody = (<div></div>)
        switch(type){
            case 'text':
                cardBody = (<p className='content-text'>{content}</p>);
                break;
            case 'url':
                cardBody = (<p className='content-text'>{content}</p>);
                break;
            case 'doc':
                cardBody = (<p className='content-text'>{content}</p>);
                break;
            case 'img':
                cardBody = (<img className='content-image' src={content} alt='card'/>);
                break;
            case 'pdf':
                cardBody = (<p className='content-text'>{content}</p>);
                break;
            case 'code':
                cardBody = (<pre className='content-text'>{content}</pre>);
                break;
            default:
                cardBody = (<p className='content-text'>{content}</p>);
                break;
        }
        return(
            <div className='cont-card-wrapper'>
                <div style={{ textDecoration: 'none', color: '#565761' }}>
                    {
                        ( showCreate ? <button className='content-delete' onClick={() => this.handleDelete()}><i className="fa fa-trash" aria-hidden="true"></i></button> : <div></div>)
                    }
                    <h3 className='content-title'>{title}</h3>
                    {cardBody}
                </div>
            </div>
        )
    }
}