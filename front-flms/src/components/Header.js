import React from 'react';
import {Link} from "react-router-dom";
import {Nav, Navbar, NavbarBrand, NavItem} from "reactstrap";

const Header = () => {
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand>Hello</NavbarBrand>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <Link to="/connexion">Connexion</Link>
                </NavItem>
                <NavItem>
                    <Link to="/">Inscription</Link>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default Header;
