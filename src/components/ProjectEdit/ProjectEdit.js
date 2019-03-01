import React, { Component } from 'react';

export default class ProjectEdit extends Component{
    constructor(props){
        super(props)
        this.state={
            userID: null,
            cardTitle: this.props.title,
            channel: 'default',
            channelList: []
        }
    }

    handleChange (prop, val) {
        this.setState({
            [prop]: val
        })
        console.log(this.state)
    }

    render(){
        const { title, image_URL, project_id, channelList, deleteProjFn } = this.props
        return(
            <div>
                <img className='proj-image' src={image_URL} alt='project' />
                <div className='proj-title-wrapper'>
                    <div className='title-update-wrapper'>
                        <p>Channel</p>
                        <div className='proj-inputs'>
                            <select className='proj-card-input' name='type' onChange={(e) => this.handleChange('channel', e.target.value)} >
                                {
                                    channelList.map((channel, index) => (
                                        <option value={channel.name} key={index}>{channel.name}</option>
                                    ))
                                }
                            </select>
                            <p>Title</p>
                            <input className='proj-card-input' placeholder={title} value={this.state.cardTitle} onChange={(e) => this.handleChange('cardTitle', e.target.value)}/>
                        </div>
                        <button className="hamburger" onClick={() => this.saveTitle()} ><i className="far fa-save"></i></button>  
                    </div>
                </div>
                <button className='proj-delete' onClick={() => deleteProjFn(project_id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
            
            </div>
        )
    }
}