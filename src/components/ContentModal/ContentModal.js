import React, { Component } from 'react';
import './ContentModal.css'
import axios from  'axios'

export default class ContentModal extends Component{
    constructor(props){
        super(props)

        this.state = {
            type: '',
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
        const { type, title, content } = this.state
        return(
            <div>
                <input className='modal-type' value={type} onChange={(e) => this.handleChange('type', e.target.value)} />
                <input className='modal-title' value={title} onChange={(e) => this.handleChange('title', e.target.value)} />
                <input className='modal-content' value={content} onChange={(e) => this.handleChange('content', e.target.value)} />
                <button onClick={() => this.handleCancel()}>Cancel</button>
                <button onClick={() => this.handleCreate()}>Create</button>
            </div>
        )
    }
}