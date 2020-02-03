import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import './Header.css';

import {useDispatch, useSelector} from "react-redux";
import allActions from "../actions/action";
const Header = () => {

    const loggedIn = useSelector(state => state.loggedIn);

    const dispatch = useDispatch();

    const handleSignOut = () => {
        sessionStorage.removeItem('jwtToken');
        dispatch(allActions.logoutAction());
    };

    const navContent = () => {
        if (sessionStorage.getItem('jwtToken')) {
            return (
                <NavItem className="mr-4">
                    <Link to="/pluginsList"><Button>Liste des plugins</Button></Link>
                    <Link to="/publishPlugin"><Button>Publier un plugin</Button></Link>
                    <Button onClick={handleSignOut}>Déconnexion</Button>
                </NavItem>
            );
        }
        return (
            <NavItem className="mr-4">
                <Link to="/pluginsList"><Button>Liste des plugins</Button></Link>
                <Link to="/login"><Button>Connexion</Button></Link>
                <Link to="/register"><Button>Inscription</Button></Link>
            </NavItem>
        );
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand className="mr-auto"><NavLink to="/">Store FMLS</NavLink></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
                <Nav className="ml-2">
                    {sessionStorage.getItem('jwtToken') ?
                        <NavItem className="mr-4">
                            <NavLink to="/pluginsList"><Button>Liste des plugins</Button></NavLink>
                            <NavLink to="/publishPlugin"><Button>Publier un plugin</Button></NavLink>
                            <Button onClick={handleSignOut}>Déconnexion</Button>
                        </NavItem>
                        :
                        <NavItem className="mr-4">
                            <NavLink to="/pluginsList"><Button>Liste des plugins</Button></NavLink>
                            <NavLink to="/login"><Button>Connexion</Button></NavLink>
                            <NavLink to="/register"><Button>Inscription</Button></NavLink>
                        </NavItem>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
