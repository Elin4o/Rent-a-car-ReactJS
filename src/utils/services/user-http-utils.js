import axios from 'axios';

const apiUrl = 'http://localhost:3005/users';

export function getUsers() {
    return axios.get(apiUrl);
}

export function getUserById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export function saveUser(userObj) {
    if (userObj.id) {
        return axios.put(`${apiUrl}/${userObj.id}`, userObj);
    }

    return axios.post(apiUrl, userObj);
}

export function deleteUser(id) {
    return axios.delete(`${apiUrl}/${id}`);
}