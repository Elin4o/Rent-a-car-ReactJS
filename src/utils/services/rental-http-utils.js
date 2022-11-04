import axios from "axios";
import { getLoggedUser } from "./auth-http-utils";
import { getCurrentCarToRent } from "./car-http-utils";

const apiUrl = 'http://localhost:3005/rentals';

export function getRentals() {
    return axios.get(apiUrl);
}

export function getAllRentalsForCustomer(customerId) {
    return axios.get(`${apiUrl}?customerId=${customerId}`);
}

export function saveRental(rentalObject) {
    if (rentalObject.id) {
        return axios.put(`${apiUrl}/${rentalObject.id}`, rentalObject);
    }

    const loggedUser = getLoggedUser();
    const currentCar = getCurrentCarToRent();
    rentalObject.customerId = loggedUser.id;
    rentalObject.customerName = `${loggedUser.firstName} ${loggedUser.lastName}`;
    rentalObject.vehicleId = currentCar.id;
    rentalObject.rentedVehicle = `${currentCar.brand} ${currentCar.model}`;
    return axios.post(apiUrl, rentalObject);
}

export function deleteRental(id) {
    return axios.delete(`${apiUrl}/${id}`);
}
