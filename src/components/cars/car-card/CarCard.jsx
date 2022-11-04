import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router';
import { getLoggedUser } from '../../../utils/services/auth-http-utils';
import { Button } from 'react-bootstrap';
import './CarCard.scss';

export function CarCard({ car, onDelete }) {

    const navigate = useNavigate();

    const onDeleteClicked = () => {
        onDelete(car.id);
    }

    const navigateToUpdate = () => {
        navigate(`/cars/edit/${car.id}`);
    }

    const navigateToRent = () => {
        navigate(`/rentals/create/`);
        localStorage.setItem('currentCarToRent', JSON.stringify(car));
    }

    const renderActionButtons = () => {
        const loggedUser = getLoggedUser();

        if (loggedUser.isAdmin) {
            if(car.count === 0){
                return <>
                    <Button onClick={navigateToRent} disabled>Rent</Button>
                    <Button onClick={navigateToUpdate} >Edit</Button>
                    <Button onClick={onDeleteClicked}>Delete</Button>
                </>
            }
            else{
                return <>
                    <Button onClick={navigateToRent}>Rent</Button>
                    <Button onClick={navigateToUpdate} >Edit</Button>
                    <Button onClick={onDeleteClicked}>Delete</Button>
                </>
            }
        }
        else{
            if(car.count === 0){
                return <>
                <Button onClick={navigateToRent} disabled>Rent</Button>
                </>
            }
            else{
                return <>
                    <Button onClick={navigateToRent}>Rent</Button>
                </>
            }
        }
    }

    return (
        <Card  className="carCard">
            <Card.Body>
                <Card.Title>{car.brand} {car.model}</Card.Title>
            </Card.Body>
            <Card.Img variant="top" src={car.picture} />
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Type: {car.vehicleType} </ListGroup.Item>
                <ListGroup.Item>Year: {car.constructionYear}</ListGroup.Item>
                <ListGroup.Item>Fuel: {car.fuelType} </ListGroup.Item>
                <ListGroup.Item>Seats: {car.numberOfSeats} </ListGroup.Item>
                <ListGroup.Item>Price per day: {car.pricePerDay} € </ListGroup.Item>
                <ListGroup.Item>Available: {car.count} </ListGroup.Item>
            </ListGroup>
            <Card.Body>
                {renderActionButtons()}
            </Card.Body>
        </Card>
    );
}