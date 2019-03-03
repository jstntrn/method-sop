import React, { Component } from 'react'
import './ProjectCard.scss'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { updateUser } from './../../ducks/reducer';
import { connect } from 'react-redux';

class ProjectCard extends Component{
    constructor(props){
        super(props)
        this.state ={
            userID: null,
            cardTitle: this.props.title,
            channel: 'default',
            channelID: null,
            channelList: []
        }
    }

    componentDidMount(){
        const {id} = this.props;
        if(!id){
            axios.get('./api/user')
            .then(res => {
                this.props.updateUser(res.data);
                this.setState({
                    userID: this.props.id
                })
                axios.get(`/api/channels/${this.props.id}`)
                .then(res => {
                    this.setState({
                        channelList: res.data
                    })
                })
            })
            .catch(err => {
                this.props.history.push('/');
            })
        } else {
            this.setState({
                userID: id
            })
            axios.get(`/api/channels/${this.props.id}`)
            .then(res => {
                this.setState({
                    channelList: res.data
                })
            })
        }
        this.setState({
            userID: id
        })
    }

    channelUpdate (prop, val) {
        const channelIndex = this.state.channelList.findIndex(channel => {
            return channel.name === val
        })
        this.setState({
            [prop]: val,
            channelID: this.state.channelList[channelIndex].id
        })
    }

    saveTitle(){
        const { project_id, updateLibrary, toggleEdit } = this.props
        const { cardTitle, channelID } = this.state
        axios.put(`/api/project/${project_id}`, {
            title: cardTitle,
            channelID: channelID
        })
        updateLibrary()
        toggleEdit()
    }

    render(){
        const { title, image_URL, project_id, editing, deleteProjFn } = this.props
        return(
            <div className='proj-card-wrapper'>
                {
                    (editing ? 
                    <div>
                        <img className='proj-image' src={image_URL} alt='project' />
                        <div className='proj-title-wrapper'>
                            <div className='title-update-wrapper'>
                                <p>Channel</p>
                                <div className='proj-inputs'>
                                    <select className='proj-card-input' name='type' onChange={(e) => this.channelUpdate('channel', e.target.value)} >
                                        {
                                            this.state.channelList.map((channel, index) => (
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
                    :
                    <div>
                        <Link to={`/viewer/${project_id}`} style={{ textDecoration: 'none', color: '#565761' }}>
                            {/* <button><i className="icon-move"></i></button> */}
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

function mapStateToProps(state){
    const { id } = state
    return {
        id
    };
};

export default connect(mapStateToProps, {updateUser})(ProjectCard);