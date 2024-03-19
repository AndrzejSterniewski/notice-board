import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <Navbar bg="primary" data-bs-theme="dark" expand="lg" className="mt-4 mb-4 rounded" >
            <Container>
                <Navbar.Brand as={NavLink} to="/">NoticeBoard</Navbar.Brand>
                <Nav>
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                    <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
                    <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                    <Nav.Link as={NavLink} to="/ad/add">Add ad</Nav.Link>
                    <Nav.Link as={NavLink} to="/search/:searchPhrase">Search</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;