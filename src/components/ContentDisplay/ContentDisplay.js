import React, { Component } from 'react'
import ContentCard from './../ContentCard/ContentCard'
import './ContentDisplay.css'
import axios from 'axios'
import ContentModal from './../ContentModal/ContentModal'

export default class ContentDisplay extends Component{
    constructor(props){
        super(props)

        this.state = {
            slideID: 22,
            contentList: [],
            showModal: false
        }
    }

    componentDidUpdate(prevState){
        if (this.props.slideID !== prevState.slideID){
            axios.get(`/api/content/${this.props.slideID}`)
            .then(res => {
                this.setState({
                    slideID: this.props.slideID,
                    contentList: res.data
                })
            })
        }
    }

    updateDisplay = () => {
        axios.get(`/api/content/${this.state.slideID}`)
        .then(res => {
            console.log(res.data)
            this.setState({
                contentList: res.data
            })
        })
    }

    createModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render(){
        const { showCreate } = this.props
        const { showModal, slideID } = this.state
        return(
            <div className='contents-container'>
                
                {
                    this.state.contentList.map(content => (
                    <ContentCard
                    key={content.id}
                    id={content.id}
                    type={content.type}
                    title={content.title}
                    content={content.content}
                    updateDisplay={this.updateDisplay}
                    />
                    ))
                }
                {
                    (showModal ?
                    <ContentModal createModal={this.createModal} updateDisplay={this.updateDisplay} slideID={slideID} />
                    :
                    (showCreate ? 
                        <button className='add-content-wrapper' onClick={() => this.createModal()}>
                            <div>
                                <h4>+ADD CONTENT CARD</h4>
                            </div>
                        </button>
                        :
                        <div></div>)
                    )
                }
            </div>
        )
    }
}
