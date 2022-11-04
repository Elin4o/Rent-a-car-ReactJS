import { Form, Button, FormGroup } from "react-bootstrap";
import { useState } from "react";
import { saveRental, getRentalById } from "../../../utils/services/rental-http-utils";
import { useNavigate, useParams } from "react-router";
import './RentalForm.scss'
import { getCurrentCarToRent, saveCar} from "../../../utils/services/car-http-utils"
import { useEffect } from "react";
import { getLoggedUser } from "../../../utils/services/auth-http-utils";
import { calculateTotalPrice , checkForDiscount} from "../rental-discounts/RentalDiscount";
import { saveUser } from "../../../utils/services/user-http-utils";
import { Table } from "react-bootstrap";
import { getUserById } from "../../../utils/services/user-http-utils";

export function RentalForm() {
    const navigate = useNavigate();
    const loggedUser = getLoggedUser();
    const [currentRental, setCurrentRental] = useState({
        startDate: '',
        endDate:'',
        rentalPrice:''
    });

    const [user, setUser] = useState({
        isAdmin: false,
        name: '',
        picture: '',
        email: '',
        phone: '',
        address: '',
        isVip: false,
        totalRentedCars: 0,
    });

    useEffect(() => {
        if (loggedUser.id) {
          getUserById(loggedUser.id).then((user) => {
            setUser(user.data);
          });
        }
    }, [loggedUser.id]);

    const daysDifference = getDayDifference(new Date(currentRental.startDate),new Date(currentRental.endDate)).toString();
    const discount = checkForDiscount(daysDifference);
    const price = calculateTotalPrice({daysDifference},discount);

    const onFormChange = (event) => {
        setCurrentRental((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    const onFormSubmit = (event) => {
        const car = getCurrentCarToRent();
        car.count -= 1;
        user.rentedCars+=1;
        currentRental.rentalPrice = price;

        if (user.rentedCars >= 3) {
            user.isVip = true;
        }
        else{
            user.isVip = false;
        }

        localStorage.setItem('loggedUser', JSON.stringify(user));

        event.preventDefault();
        saveCar(car).then(() => {
            saveUser(user).then(() => {
                saveRental(currentRental).then(() => {
                    navigate('/rentals');
                });
            });
        });

    }

    function getDayDifference(date1, date2) {
        const difference = Math.abs(date2 - date1);
    
        return difference / (1000 * 60 * 60 * 24);
    }

    function SetDiscountTag(){
    
        if(discount === 3){
            return "3%";
        }
        else if (discount === 5){
            return "5%";
        }
        else if (discount === 7){
            return "5%";
        }
        else if (discount === 10){
            return "10%";
        }
        else if (discount === 15){
            return "15%";
        }
        else{
            return "0%";
        }
    }
   
    return (
        <div className="rental-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Label>Renting</Form.Label>    
                <Form.Group>
                </Form.Group>           
                <Form.Group>
                    <Form.Label>From</Form.Label>
                    <Form.Control type="datetime-local" name="startDate"  onChange={onFormChange} value={currentRental.startDate} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>To</Form.Label>
                    <Form.Control type="datetime-local" name="endDate" onChange={onFormChange} value={currentRental.endDate} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Table>
                        <thead>
                            <tr>
                                <td>
                                    Renting Days
                                </td>
                                <td>
                                    Discount
                                </td>
                                <td>
                                    Price
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {daysDifference}
                                </td>
                                <td>
                                    {SetDiscountTag()}
                                </td>
                                <td>
                                   {price}
                                </td>
                            </tr>
                        </tbody>             
                    </Table>
                </Form.Group>
                <Button type="submit">Rent</Button>
            </Form>
        </div>
    );
}

