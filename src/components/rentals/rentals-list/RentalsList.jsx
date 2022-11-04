import { useState } from "react";
import { Table } from "react-bootstrap";
import { useEffect } from "react";
import { getRentals, deleteRental,getAllRentalsForCustomer } from "../../../utils/services/rental-http-utils";

import './RentalsList.scss';
import { useParams } from "react-router";

const wrapperStyles = {
    margin: '20px'
};

export function RentalsList(rental) {
    const [rentals, setRentals] = useState([]);
    const params = useParams();

    useEffect(() => {
        if(params.id){
            getAllRentalsForCustomer(params.id).then(response => {
                setRentals(response.data);
            });
        }
        else{
            getRentals().then((response) => {
                setRentals(response.data);
            });
        }
    }, [])

    const renderTableBody = () => {
        return rentals.map(rental => {
            const onDelete = () => {
                deleteRental(rental.id).then(() => {
                    setRentals((allRentals) => {
                        return allRentals.filter(t => t.id !== rental.id);
                    });
                });
            }

            return <tr key={rental.id}>
                <td>{rental.id}</td>
                <td>{rental.customerName}</td>
                <td>{rental.rentedVehicle}</td>
                <td>{rental.startDate}</td>
                <td>{rental.endDate}</td>
                <td>{rental.rentalPrice} €</td>
                <td className="action-buttons">
                    <button className="delete" onClick={onDelete}>Delete</button>
                </td>
            </tr>
        })
    }

    return (
        <div className="rentals-list" style={wrapperStyles}>
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Customer</td>
                        <td>Vehicle</td>
                        <td>From Date</td>
                        <td>To Date</td>
                        <td>Price</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody()}
                </tbody>
            </Table>
        </div>
    );
}