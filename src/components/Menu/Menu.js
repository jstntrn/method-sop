import React, { Component } from 'react'
import './Menu.css'
import { Link } from 'react-router-dom'

class Menu extends Component{

    render(){
        let menu = (
            <div className="dialogStyles">
                <h3 className="dialogCloseButtonStyles" onClick={this.props.closeMenu}>+</h3>
                <div className='menu-list'>
                    <Link to='/login' className='menu-link highlight'>Login</Link>
                    <Link to='/' className='menu-link'>Integrations</Link>
                    <Link to='/' className='menu-link'>Clients</Link>
                    <Link to='/' className='menu-link'>Pricing</Link>
                    <Link to='/' className='menu-link'>Contact</Link>
                </div>
            </div>

        );

        
        if (!this.props.showMenu) {
            menu = null;
        };

        return(
            <div>
                {menu}
            </div>
        );
    }
}

export default Menu;