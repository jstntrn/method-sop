import React, { Component } from 'react'
import ProjectCard from './../ProjectCard/ProjectCard'
import './ProjectLibrary.scss'
import axios from 'axios'
import { updateUser } from './../../ducks/reducer';
import { connect } from 'react-redux';

class ProjectLibrary extends Component{
    constructor(props){
        super(props)

        this.state = {
            projectList: [],
            channelList: []
        }
    }

    //test and fix
    componentDidMount(){
        const {id} = this.props;
        if(!id){
            axios.get('./api/user')
            .then(res => {
                axios.get(`/api/projects`)
                .then(res => {
                    this.setState({
                        projectList: res.data
                    })
                })
                axios.get(`/api/channels/${this.props.id}`)
                .then(res => {
                    this.setState({
                        channelList: res.data
                    })
                })
            })
        } else {
            axios.get(`/api/projects`)
            .then(res => {
                this.setState({
                    projectList: res.data
                })
            })
            axios.get(`/api/channels/${this.props.id}`)
                .then(res => {
                    this.setState({
                        channelList: res.data
                    })
                })
        }
    }

    deleteProject = (id) => {
        axios.delete(`/api/project/${id}`)
        .then(res => {
            axios.get(`/api/projects`)
            .then(res => {
            this.setState({
                projectList: res.data
            })
        })
        })
    }

    updateLibrary = () => {
        axios.get(`/api/projects`)
        .then(res => {
            this.setState({
                projectList: res.data
            })
        })
    }   

    render(){
        return(
            <div className='projects-container'>
                {
                    this.state.channelList.map((channel, index) => (
                        <div key={index} className='channel-projects'>
                            <h3 style={{textAlign: 'left'}} >{channel.name}</h3>
                            <div className='projects-wrapper'>
                                {
                                    this.state.projectList.map((project, index) => (
                                        (project.channel_id === channel.id ? 
                                            <ProjectCard
                                            key={project.id}
                                            project_id={project.id}
                                            title={project.title}
                                            image_URL={project.image_url}
                                            editing={this.props.editing}
                                            deleteProjFn={this.deleteProject}
                                            toggleEdit={this.props.toggleEdit}
                                            updateLibrary={this.updateLibrary}
                                            />
                                            :
                                            <div key={index}></div>
                                        )
                                    ))
                                }
                            </div>
                        </div>
                    ))
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

export default connect(mapStateToProps, {updateUser})(ProjectLibrary);