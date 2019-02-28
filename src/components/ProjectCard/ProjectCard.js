import React, { Component } from 'react'
import './ProjectCard.scss'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default class ProjectCard extends Component{
    constructor(props){
        super(props)
        this.state ={
            cardTitle: this.props.title,
            channel: 'default'
        }
    }

    handleChange (prop, val) {
        this.setState({
            [prop]: val
        })
        console.log(this.state)
    }

    saveTitle(){
        const { project_id, updateLibrary, toggleEdit } = this.props
        const { cardTitle } = this.state
        axios.put(`/api/project/${project_id}`, {
            title: cardTitle
        })
        updateLibrary()
        toggleEdit()
        console.log(this.state)
    }

    render(){
        const { title, image_URL, project_id, editing, deleteProjFn } = this.props
        return(
            <div className='proj-card-wrapper'>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"/>
                {/* <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"></link> */}
                {
                    (editing ? 
                    <div>
                        <img className='proj-image' src={image_URL} alt='project' />
                        <div className='proj-title-wrapper'>
                            <div className='title-update-wrapper'>
                                <p>Channel</p>
                                <div className='proj-inputs'>
                                    <select className='proj-card-input' name='type' onChange={(e) => this.handleChange('channel', e.target.value)} >
                                        <option value='electrical'>Electrical</option>
                                        <option value='assembly'>Assembly</option>
                                        <option value='testing'>Testing</option>
                                        <option value='packaging'>Packaging</option>
                                        <option value='shipping'>Shipping</option>
                                        <option value='lot tracking'>Lot Tracking</option>
                                        <option value='orders'>Orders</option>
                                        <option value='payroll'>Payroll</option>
                                    </select>
                                    <p>Title</p>
                                    <input className='proj-card-input' placeholder={title} value={this.state.cardTitle} onChange={(e) => this.handleChange('cardTitle', e.target.value)}/>
                                </div>
                                <button className="hamburger" onClick={() => this.saveTitle()} ><i className="far fa-save"></i></button>  
                            </div>
                        </div>
                        <button className='proj-delete' onClick={() => deleteProjFn(project_id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </div>
                    :
                    <div>
                        <Link to={`/viewer/${project_id}`} style={{ textDecoration: 'none', color: '#565761' }}>
                            <img className='proj-image' src={image_URL} alt='project' />
                            <div className='proj-title-wrapper'>
                                <h3 className='proj-card-title'>{title}</h3>
                            </div>
                        </Link>
                        
                    </div>)
                }
                
                
            </div>
        )
    }
}