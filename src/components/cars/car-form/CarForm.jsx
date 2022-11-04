import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { saveCar, getCarById } from '../../../utils/services/car-http-utils';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';

import './CarForm.scss';

export function CarForm() {
    const emptyCar = {
        brand: '',
        model: '',
        constructionYear: '',
        vehicleType: '',
        fuelType: '',
        numberOfSeats: '',
        pricePerDay: '',
        count: '',
        picture: ''
    };
    const [currentCar, setCurrentCar] = useState(emptyCar);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getCarById(params.id)
                .then((response) => {
                    setCurrentCar(response.data);
                })
        } else {
            setCurrentCar(emptyCar);
        }
    }, [params.id]);

    const onFormControlChange = (event) => {       
        setCurrentCar((prevState) => {
            const target = event.target;
        let prop = 'value';
        if (target.name === 'isAdmin')
            prop = 'checked';

            return {
                ...prevState,
                [event.target.name]: event.target[prop]
            }
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(currentCar);
        saveCar(currentCar).then(() => {
            navigate('/cars');
        });
    }

    return (
        <div className="car-form-wrapper">
            <Form className="car-form" onSubmit={onSubmit}>
            <h3>Adding New Vehicle </h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" name="brand" placeholder="Brand" onChange={onFormControlChange} value={currentCar.brand} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" name="model" placeholder="Model" onChange={onFormControlChange} value={currentCar.model} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="number" min="1935" max="2099" step="1" name="constructionYear" placeholder="Year of production" onChange={onFormControlChange} value={currentCar.constructionYear} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Vehicle Type</Form.Label>
                    <Form.Select name="vehicleType" onChange={onFormControlChange} value={currentCar.vehicleType} required>
                        <option value="Economy">Economy</option>
                        <option value="Estate" >Estate</option>
                        <option value="Luxury">Luxury</option>
                        <option value="SUV">SUV</option>
                        <option value="Cargo">Cargo</option>
                    </Form.Select>
                    
                </Form.Group>     
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Fuel Type</Form.Label>
                    <Form.Select name="fuelType" onChange={onFormControlChange} value={currentCar.fuelType} required>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel" >Diesel</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Electric">Electric</option>      
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Seats</Form.Label>
                    <Form.Control type="number" name="numberOfSeats"  min="1" max="10" step="1"  placeholder="Number of seats" onChange={onFormControlChange} value={currentCar.numberOfSeats} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Price Per Day</Form.Label>
                    <Form.Control type="number" name="pricePerDay"  min="30" max="10000" step="1"  placeholder="Price per day" onChange={onFormControlChange} value={currentCar.pricePerDay} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Available vehicles</Form.Label>
                    <Form.Control type="number" name="count"  min="1" max="2000" step="1"  placeholder="Number of available vehicles" onChange={onFormControlChange} value={currentCar.count} required/>
                </Form.Group>     
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="text" name="picture" placeholder="Picture link" onChange={onFormControlChange} value={currentCar.picture} />
                </Form.Group>     
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}