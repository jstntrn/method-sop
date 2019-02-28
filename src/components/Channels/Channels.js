import React, { Component } from 'react';
import './Channels.scss'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap'


export default class Channels extends Component{
    constructor(props){
        super(props)
        this.state = {
            channelList: ['electrical', 'assembly', 'testing', 'packaging', 'shipping', 'lot tracking', 'orders', 'payroll']
        }
    }

    render(){
        return(
            <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"/>
                {/* <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"></link> */}
                <link href="https://fonts.googleapis.com/css?family=Do+Hyeon" rel="stylesheet"></link>
                <div className='header viewer-header dash'>
                    <div className='header-left'>
                        <h1 className='logo'>method</h1>
                        {/* <h1 className='logo yel'>sop</h1> */}
                        <h1 className='dash-title'>|   Channel Manager</h1>
                    </div>
                    <div className='header-right'>
                        <OverlayTrigger placement='bottom' overlay={<Tooltip id={`tooltip-bottom`} className='trigger'>Edit Channels</Tooltip>}>
                            <button className="hamburger"><i className="fas fa-pencil-alt"></i></button>
                        </OverlayTrigger>                        
                        <OverlayTrigger placement='bottom' overlay={<Tooltip id={`tooltip-bottom`} className='trigger'>Dashboard</Tooltip>}>
                            <Link to='/dashboard' style={{ textDecoration: 'none' }}><button className="hamburger"><i className="fas fa-arrow-alt-circle-left"></i></button></Link>
                        </OverlayTrigger>  
                    </div>
                </div>
                <div style={{marginTop: '50px'}}>
                    <h2>Channels</h2>
                    <ListGroup>
                        {
                            this.state.channelList.map(channel => (
                                <ListGroup.Item>{channel}</ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </div>
            </div>
        )
    }
}