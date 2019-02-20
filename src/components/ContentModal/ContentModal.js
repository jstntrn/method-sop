import React, { Component } from 'react';
import './ContentModal.css'
import axios from  'axios'

export default class ContentModal extends Component{
    constructor(props){
        super(props)

        this.state = {
            type: 'text',
            title: '',
            content: ''
        }
    }

    handleChange(prop, val){
        this.setState({
            [prop]: val
        })
    }

    handleCancel(){
        const { createModal } = this.props
        createModal()
    }

    handleCreate(){
        const { slideID, createModal, updateDisplay } = this.props
        const { type, title, content } = this.state
        axios.post(`/api/content/${slideID}`, {
            type: type,
            title: title,
            content: content
        })
        .then(res => {
            updateDisplay()
            createModal()
        })
        .catch(err => console.log(err))
    }

    render(){
        const { title, content } = this.state
        return(
            <div className='modal-wrapper'>
                <button className='modal-button cancel' onClick={() => this.handleCancel()}><i className="fas fa-times"></i></button>
                <div className='modal-inputs'>
                    <div className='modal-top'>
                        <select name='type' onChange={(e) => this.handleChange('type', e.target.value)} >
                            <option value='text'>Text</option>
                            <option value='url'>URL</option>
                            <option value='doc'>Document</option>
                            <option value='img'>Image</option>
                            <option value='pdf'>PDF</option>
                        </select>
                        <input className='modal-title' value={title} placeholder={'title'} onChange={(e) => this.handleChange('title', e.target.value)} />
                    </div>
                    <textarea className='modal-content' value={content} placeholder={'content'} onChange={(e) => this.handleChange('content', e.target.value)} />
                </div>
                <button className='modal-button create' onClick={() => this.handleCreate()}><i class="fas fa-check"></i></button>
            </div>
        )
    }
}