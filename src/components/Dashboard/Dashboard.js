import React, { Component } from 'react'
import './Dashboard.css'
import ProjectLibrary from './../ProjectLibrary/ProjectLibrary'

class Dashboard extends Component{
    
    render(){
        return(
            <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous"/>
                <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"></link>
                <link href="https://fonts.googleapis.com/css?family=Do+Hyeon" rel="stylesheet"></link>
                <div className='header viewer-header dash'>
                    <div className='header-left'>
                        <h1 className='logo'>method</h1>
                        <h1 className='logo yel'>sop</h1>
                        <h1 className='dash-title'>|   Dashboard</h1>
                    </div>
                    <div className='header-right'>
                        <button className="hamburger"><i className="fas fa-bars"></i></button>
                    </div>
                </div>
                <div className='dash-body'>
                    <ProjectLibrary />
                </div>
            </div>
        )
    }
}

export default Dashboard;