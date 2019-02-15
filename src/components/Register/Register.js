import React, { Component } from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser } from './../../ducks/reducer'
import axios from 'axios'

class Register extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount(){
        const { id } = this.props;
        if (id) {
            this.props.history.push('/dashboard')
        } else {
            axios.get('/api/user')
            .then(res => {
                this.props.updateUser(res.data)
                this.props.history.push('./dashboard')
            })
            .catch(err => {

            })
        }
    }

    handleChange (prop, val) {
        this.setState({
            [prop]: val
        })
    }

    register = () => {
        const { username, password } = this.state
        axios.post('/auth/register', { username, password })
        .then(res => {
            this.props.updateUser(res.data)
            this.props.history.push('/dashboard');
        })
        .catch((err) => console.log(err))
    }

    render(){
        const { username, password } = this.state;
        return(
            <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"/>
                <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"></link>
                <link href="https://fonts.googleapis.com/css?family=Do+Hyeon" rel="stylesheet"></link>   
                <div className='reg-form-header'>
                    <Link to='/' style={{ textDecoration: 'none', color: '#565761' }}><i className="fa fa-times"></i></Link>
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
                            <div className='input-div'>
                                <i className="fas fa-user"></i>
                                <input className='home-form-input' placeholder={'username'} value={username} onChange={(e) => this.handleChange('username', e.target.value)}/>
                            </div>
                            <div className='input-div'>
                                <i className="fas fa-envelope"></i>
                                <input className='home-form-input' placeholder={'email'} />
                            </div>
                            <div className='input-div'>
                                <i className="fas fa-key"></i>
                                <input className='home-form-input' placeholder={'password'} type='password' value={password} onChange={(e) => this.handleChange('password', e.target.value)}/>
                            </div>
                            <button className='form button' onClick={this.register}>GET STARTED - FREE</button>
                            <p className='terms'>When signing up you accept the terms and conditions</p>
                            <p>If you already have an account, login <Link to='/login'>here</Link></p>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        id: state.id
    }
}

export default connect(mapStateToProps, {updateUser})(Register)