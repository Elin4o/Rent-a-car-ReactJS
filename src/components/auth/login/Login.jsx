import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { login } from "../../../utils/services/auth-http-utils";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import './Login.scss';

export function Login() {
    const [loginCreds, setLoginCreds] = useState({});
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const onFormControlChange = (event) => {
        setLoginCreds((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        login(loginCreds)
            .then(() => {
                navigate('/users');
            })
            .catch((err) => {
                setError(err.message);
            });
    }

    return (
        <div className="login-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <span className="text-danger">
                    {error}
                </span>
                <Form.Group >
                    <Form.Label>
                        <h2 className="text-login">Login</h2>
                    </Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Control className="input" type="email" name="email" placeholder="Email" onChange={onFormControlChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Control className="input" type="password" name="password" placeholder="Password" onChange={onFormControlChange} required />
                </Form.Group>
                <Button type="submit">Sign In</Button>
                <div className="text-signUp">
                    <p>First time renting? </p>
                    <Link to="/register">Sign up</Link>
                </div>
            </Form>
        </div>
    );
}