import React from 'react';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { isSuperuser } from '../../utils';

const Header = () => {
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        history.push("/");
    }

    return (
        <Navbar collapseOnSelect expand="md" className="animate__animated animate__fadeInDownBig">
            <Navbar.Brand>
                <Link to="/">
                    <img 
                        src="https://lh3.googleusercontent.com/GsIEZwyBCKlOlF6gyG-J7tAsuU1zimT2gCqVVC19rgKEeI7l-4XYOUwWQKxLxQlSLSw"
                        alt ="logo"
                        width="80"
                        height="80" />
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#features" className="mx-auto"></Nav.Link>
                </Nav>
                <Nav>
                    {/* <Link className="nav-link mx-auto" to="/">Acerca de nosotros</Link> */}
                    {/* <Link className="nav-link mx-auto" to="/">Nuestros clientes</Link> */}
                    {
                        localStorage.getItem("token") && (
                            <>
                                <Link className="nav-link mx-auto" to="/lendings">Préstamos</Link>
                                {
                                    isSuperuser() && (
                                        <Link className="nav-link mx-auto" to="/performance">Rendimiento</Link>
                                    )
                                }
                                <Nav.Link eventKey={2} className="mx-auto" onClick={logout}>
                                    Salir
                                </Nav.Link>
                            </>
                        )
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;