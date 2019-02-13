import React, { Component } from 'react'
import './Register.css'
import { Link } from 'react-router-dom'

class Register extends Component{
    render(){
        return(
            <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous"/>
                <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"></link>
                <link href="https://fonts.googleapis.com/css?family=Do+Hyeon" rel="stylesheet"></link>   
                <div className='reg-form-header'>
                    <Link to='/' style={{ textDecoration: 'none', color: '#565761' }}><i class="fa fa-times"></i></Link>
                </div>             
                <div className='reg-form-container'>
                    <div className='header-left reg-logo'>
                        <h1 className='logo'>method</h1>
                        <h1 className='logo yel'>sop</h1>
                    </div>
                    <div className='home-form-container reg-form'>
                        <div className='home-form'>
                            <h1>Register</h1>
                            <h4>Create an account that remains free, without any minimum contract period</h4>
                            <input className='home-form-input'/>
                            <input className='home-form-input'/>
                            <input className='home-form-input'/>
                            <button className='form button'>GET STARTED - FREE</button>
                            <p className='terms'>When signing up you accept the terms and conditions</p>
                            <p>If you already have an account, login <Link to='/login'>here</Link></p>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Register;