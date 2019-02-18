import React, { Component } from 'react'
import ProjectCard from './../ProjectCard/ProjectCard'
import './ProjectLibrary.css'
import axios from 'axios'

class ProjectLibrary extends Component{
    constructor(props){
        super(props)

        this.state = {
            projectList: []
        }
    }

    //test and fix
    componentDidMount(){
        axios.get(`/api/projects/${this.props.userID}`)
        .then(res => {
            this.setState({
                projectList: res.data
            })
        })
    }

    deleteProject = (id) => {
        axios.delete(`/api/project/${id}`)
        .then(res => {
            axios.get(`/api/projects/${this.props.userID}`)
            .then(res => {
            this.setState({
                projectList: res.data
            })
        })
        })
    }

    render(){
        return(
            <div className='projects-container'>
                {
                    this.state.projectList.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project_id={project.id}
                            title={project.title}
                            image_URL={project.image_url}
                            editing={this.props.editing}
                            deleteProjFn={this.deleteProject}
                        />
                    ))
                }
            </div>
        )
    }
}

export default ProjectLibrary;