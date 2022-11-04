import { useEffect, useState } from 'react';
import { getLoggedUser } from '../../../utils/services/auth-http-utils';
import { getCurrentCarToRent ,getCarById} from '../../../utils/services/car-http-utils';

export function calculateTotalPrice(days , discount) {
    const [carTotal, setCar] = useState({});
    const currentCar = getCurrentCarToRent();
    const currentCarId = currentCar.id;
    
    useEffect(() => {
      getCarById(currentCarId).then((car) => {
        setCar(car.data);
      });
    }, [currentCarId]);

    const priceWithoutDiscount = (days.daysDifference * carTotal.pricePerDay).toFixed(2);
    const priceWithDiscount = ((days.daysDifference * carTotal.pricePerDay * discount) /100).toFixed(2);

    const totalPrice = (priceWithoutDiscount - priceWithDiscount).toFixed(2);

    return totalPrice;
}

export function checkForDiscount(countOfDays) {
    const loggedUser = getLoggedUser();

    let discount = 0;

    if (loggedUser.isVip) {
      discount = 15;
    } 
    else if (countOfDays >= 3 && countOfDays <= 5 && !loggedUser.isVip) {
      discount = 5;
    } 
    else if (countOfDays > 5 && countOfDays <= 10 && !loggedUser.isVip) {
      discount = 7;
    } 
    else if (countOfDays > 10 && !loggedUser.isVip) {
      discount = 10;
    }

    return discount;
}