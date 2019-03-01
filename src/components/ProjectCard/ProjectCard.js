import React, { Component } from 'react'
import './ProjectCard.scss'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { updateUser } from './../../ducks/reducer';
import { connect } from 'react-redux';
import ProjectEdit from './../ProjectEdit/ProjectEdit'

class ProjectCard extends Component{
    constructor(props){
        super(props)
        this.state ={
            userID: null,
            cardTitle: this.props.title,
            channel: 'default',
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
                {
                    (editing ? 
                    <div>
                        <ProjectEdit channelList={this.state.channelList} deleteProjFn={deleteProjFn} title={title} image_URL={image_URL} project_id={project_id} />
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

function mapStateToProps(state){
    const { id } = state
    return {
        id
    };
};

export default connect(mapStateToProps, {updateUser})(ProjectCard);