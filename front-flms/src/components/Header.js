import React from 'react';
import {Link} from "react-router-dom";
import {Nav, Navbar, NavbarBrand, NavItem} from "reactstrap";
import Button from "reactstrap/es/Button";

const Header = () => {
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand className="mr-auto"><Link to="/">Hello</Link></NavbarBrand>
            <Nav navbar className="mr-2">
                <NavItem className="mr-4">
                    <Link to="/connexion"><Button>Connexion</Button></Link>
                </NavItem>
                <NavItem>
                    <Link to="/register"><Button>Inscription</Button></Link>
                </NavItem>
                <NavItem>
                    <Link to="/pluginsList">Liste des plugins</Link>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default Header;
