import React, { Component } from 'react'
import './Menu.scss'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const MenuWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    position: fixed;
    height: 100vh;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;
    background-color: rgba(0,0,0,0.5);
    padding: 10px 20px 40px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-content: center;
`

const CloseButton = styled.h1`
    font: {
        size: 50px;
        weight: lighter;
    }
    &:hover {
        cursor: pointer;
    }
    padding-right: 50px;
    color: white;
    border-radius: 50%;
    background: none;
    border: none;
    transform: rotate(45deg);
    align-self: flex-end;
    position: absolute;
    top: 60px;
    right: 25px;
`

const MenuList = styled.div`
    padding-top: 100px;
    background-color: #565761;
    position: fixed;
    right: 0;
    z-index: -1;
    width: 300px;
    height: 100vh;
    display: flex;
    flex-direction: column;
`

class Menu extends Component{

    render(){
        let menu = (
            <MenuWrapper>
                <CloseButton onClick={this.props.closeMenu}>+</CloseButton>
                <MenuList>
                    <Link to='/login' className='menu-link highlight'>Login</Link>
                    <Link to='/' className='menu-link'>Integrations</Link>
                    <Link to='/' className='menu-link'>Clients</Link>
                    <Link to='/Pricing' className='menu-link'>Pricing</Link>
                    <Link to='/' className='menu-link'>Contact</Link>
                </MenuList>
            </MenuWrapper>

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