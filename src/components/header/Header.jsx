import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/services/auth-http-utils';
import { getLoggedUser } from '../../utils/services/auth-http-utils';
import './Header.scss';

export function Header() {

    const navigate = useNavigate();

    const onLogout = () => {
        logout().then(() => {
            navigate('/login');
        });
    }

    const showIfAdmin = () => {
        const loggedUser = getLoggedUser();

        if (loggedUser.isAdmin) {
            return <>
            <h6 className="user-type">Admin </h6>
            </>
        }
        else {
            return <>
            <h6 className="user-type">User </h6>
            </>
        }
    }

    const renderAdminButtons = () => {
        const loggedUser = getLoggedUser();
        const rentUrl=`/rentals/${loggedUser.id}`;

        if (loggedUser.isAdmin) {
            return <>
                <Link className="nav-link" to="/users">Users</Link>
                <Link className="nav-link" to="/users/create">Create user</Link>
                <Link className="nav-link" to="/cars">Cars</Link>
                <Link className="nav-link" to="/cars/create">Create car</Link>
                <Link className="nav-link" to="/rentals">Rentals</Link>
            </>
        }
        else{
            return <>
                <Link className="nav-link" to="/users">Users</Link>
                <Link className="nav-link" to="/cars">Cars</Link>
                <Link className="nav-link" to={rentUrl}>My Rentals</Link>
    </>
        }
    }

    return (
        <div className="header">
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Rent a car</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {renderAdminButtons()}
                        </Nav>
                        {showIfAdmin()}
                        <Link className="nav-link" onClick={onLogout} > Logout </Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}