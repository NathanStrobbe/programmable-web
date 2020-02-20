import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import allActions from '../actions/action';
import './Login.css';

const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [redirectToReferrer, setRedirectToReferrer] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();
        return fetch('http://localhost:3001/api/user/connect', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'password': password,
                'email': email
            })
        }).then(response => {
            if (response.status === 401) {
                setError(401);
            } else {
                response.json().then(data => {
                    sessionStorage.setItem('jwtToken', data.token);
                    dispatch(allActions.loginAction(data.token));
                    setRedirectToReferrer(true);
                });
            }
            return response;
        });
    };

    const handleEmailChange = event => {
        setError(0);
        setEmail(event.target.value);
    };

    const handlePasswordChange = event => {
        setError(0);
        setPassword(event.target.value);
    };

    return (
        <div className="connexion content">
            {
                redirectToReferrer ? <Redirect to='/pluginsList' /> : null
            }
            <Card className="Card">
                <Card.Header>Connexion</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit} className="Form">
                        <Form.Group>
                            <Form.Label htmlFor="exampleEmail">Email</Form.Label>
                            <Form.Control type="email" name="email" id="email" value={email} onChange={handleEmailChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="examplePassword">Mot de passe</Form.Label>
                            <Form.Control type="password" name="password" id="password" value={password} onChange={handlePasswordChange} />
                            {
                                error === 401 && (
                                    <Alert variant="danger" >
                                        Connexion impossible, verifiez votre email et mot de passe
                                    </Alert>
                                )
                            }
                        </Form.Group>
                        <Form.Group className="buttonValidate"><Button variant="outline-secondary" type="submit" className="Button">Se connecter</Button></Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};



export default Login;
