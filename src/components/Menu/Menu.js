import React, { Component } from 'react'
import './Menu.css'
import { Link } from 'react-router-dom'

class Menu extends Component{

    render(){
        let menu = (
            <div className="dialogStyles">
                <h3 className="dialogCloseButtonStyles" onClick={this.props.closeMenu}>+</h3>
                <div className='menu-list'>
                    <Link to='/login' className='menu-link'>Login</Link>
                    <Link to='/dashboard' className='menu-link'>Dashboard</Link>
                    <Link to='/upload' className='menu-link'>Upload</Link>
                    <Link to='/viewer' className='menu-link'>Viewer</Link>
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