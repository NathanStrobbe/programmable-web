import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [redirectToReferrer, setRedirectToReferrer] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        return fetch('http://localhost:3001/api/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': username,
                'password': password,
                'email': email
            })
        }).then(res => {
            if (res.status === 409) {
                setError(409);
            }
            else {
                setRedirectToReferrer(true);
            }
            return res;
        });
    };

    const handleEmailChange = event => {
        setError(0);
        setEmail(event.target.value);
    };

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    return (
        <div className="register content">
            {
                redirectToReferrer ? <Redirect to='/login' /> : null
            }
            <Card className="Card">
                <Card.Header>Inscription</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="userName">Pseudo</Form.Label>
                            <Form.Control name="userName" id="userName" value={username} onChange={handleUsernameChange} />
                        </Form.Group>
                        <Form.Group>
                            {
                                error === 409 && (
                                    <Alert variant="danger" >
                                        Cet email est déjà enregistré!
                                    </Alert>
                                )
                            }
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control type="email" name="email" id="email" value={email} onChange={handleEmailChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="examplePassword">Mot de passe</Form.Label>
                            <Form.Control type="password" name="password" id="password" value={password} onChange={handlePasswordChange} />
                        </Form.Group>
                        <Form.Group className="buttonValidate"><Button variant="outline-secondary" type="submit" className="Button">Enregistrer</Button></Form.Group>

                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Register;
