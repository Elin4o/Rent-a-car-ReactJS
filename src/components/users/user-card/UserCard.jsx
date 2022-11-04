import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router';
import { getLoggedUser } from '../../../utils/services/auth-http-utils';
import { Button } from 'react-bootstrap';
import './UserCard.scss';

export function UserCard({ user, onDelete }) {

    const navigate = useNavigate();

    const onDeleteClicked = () => {
        onDelete(user.id);
    }

    const navigateToUpdate = () => {
        navigate(`/users/edit/${user.id}`);
    }

    const renderActionButtons = () => {
        const loggedUser = getLoggedUser();

        if (loggedUser.isAdmin && loggedUser.id !== user.id) {
            return <>
                <Button onClick={navigateToUpdate} >Edit</Button>
                <Button onClick={onDeleteClicked}>Delete</Button>
            </>
        }

        if (loggedUser.id === user.id) {
            return <Button onClick={navigateToUpdate} >Edit</Button>;
        }
    }

    return (
        <Card style={{ width: '16rem', margin: '15px' }} className="userCard">
            <Card.Body>
                <Card.Title>{user.firstName} {user.lastName}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Address: {user.address}</ListGroup.Item>
                <ListGroup.Item>Email: {user.email} </ListGroup.Item>
            </ListGroup>
            <Card.Body>
                {renderActionButtons()}
            </Card.Body>
        </Card>
    );
}