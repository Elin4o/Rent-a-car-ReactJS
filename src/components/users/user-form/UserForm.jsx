import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { saveUser, getUserById } from '../../../utils/services/user-http-utils';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { getLoggedUser } from '../../../utils/services/auth-http-utils';

import './UserForm.scss';
import { parseBool } from '../../../utils/services/bool-utils';

export function UserForm() {
    const emptyUser = {
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        password: '',
        isAdmin: false,
        isVip: false
    };
    const [currentUser, setCurrentUser] = useState(emptyUser);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getUserById(params.id)
                .then((response) => {
                    setCurrentUser(response.data);
                })
        } else {
            setCurrentUser(emptyUser);
        }
    }, [params.id]);

    const onCheckboxChange = (event) => {
        setCurrentUser((prevState) => {
            return {
                ...prevState,
                isAdmin: event.target.checked.toString()
            }
        })
    }

    const canChangeToAdmin = () => {
        
        const loggedUser = getLoggedUser();
        if(loggedUser !== null) {
            if (loggedUser.isAdmin) {
                return<>
                        <Form.Label>Is Admin</Form.Label>
                        <Form.Check name="isAdmin" className='input-checkbox' onChange={onCheckboxChange} checked={parseBool(currentUser.isAdmin)} />
                </>
                    
            }
        }     
    }

    const isRegistering = () =>{
        const loggedUser = getLoggedUser();

        if(loggedUser !== null) {
            return<>
                <h2>Add User</h2>
            </>
        }
        else{
            return<>
                <h2>Register</h2>
            </>
        }
    }

    const onFormControlChange = (event) => {
        const target = event.target;
        let prop = 'value';
        if (target.name === 'isAdmin')
            prop = 'checked';

        setCurrentUser((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target[prop]
            }
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(currentUser);
        saveUser(currentUser).then(() => {
            navigate('/users');
        });
    }

    return (
        <div className="user-form-wrapper">
            <Form className="user-form" onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>{isRegistering()}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Control type="text" name="firstName" placeholder="Enter first name" onChange={onFormControlChange} value={currentUser.firstName} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Control type="text" name="lastName" placeholder="Enter last name" onChange={onFormControlChange} value={currentUser.lastName} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" name="email" placeholder="Enter Email" onChange={onFormControlChange} value={currentUser.email} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Control type="text" name="address" placeholder="Enter Address" onChange={onFormControlChange} value={currentUser.address} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">            
                    <Form.Control type="password" name="password" placeholder="Enter Password" onChange={onFormControlChange} value={currentUser.password} required />
                </Form.Group>  
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                   {canChangeToAdmin()}
                </Form.Group>                                   
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}