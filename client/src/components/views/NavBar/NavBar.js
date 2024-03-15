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
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;