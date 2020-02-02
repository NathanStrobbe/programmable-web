import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [error, setError] = useState('');
    const [redirectToReferrer, setRedirectToReferrer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
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

    const handleEmailChange = (e) => {
        setError(0);
        setEmail(e.target.value);
    };


    return (
        <div className="register content">
            {
                redirectToReferrer ? <Redirect to='/connexion' /> : null
            }
            <Card>
                <CardHeader>Inscription</CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="userName">User Name</Label>
                            <Input name="userName" id="userName" value={username} onChange={e => setUsername(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            {
                                error === 409 && (
                                    <Alert color="danger" >
                                        Cet email est déjà enregistré!
                                    </Alert>
                                )
                            }
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" value={email} onChange={handleEmailChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Mot de passe</Label>
                            <Input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </FormGroup>
                        <Button>Enregistrer</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Register;
