import React, {useState} from 'react';
import {Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label, Alert} from "reactstrap";
import { Redirect } from "react-router-dom";

const Login = () => {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [error, setError] = useState('');
    const [redirectToReferrer, setRedirectToReferrer] = useState('');

    const handleSubmit= (e) => {
        e.preventDefault();
        return fetch('http://localhost:3001/api/user/connect', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "password": password,
                "email": email
            })
        }).then(res => {
            if(res.status === 401){
                setError(401);
            }
            else{
                res.json().then(data=>{
                    sessionStorage.setItem('jwtToken', data.token);
                    setRedirectToReferrer(true);
                })
            }
            return res;
        });
    };

    const handleEmailChange = (e)=>{
        setError(0);
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e)=>{
        setError(0);
        setPassword(e.target.value);
    }

    return (
        <div className="connexion content">
            {
                redirectToReferrer ? <Redirect to='/pluginsList'/>: null
            }
            <Card>
                <CardHeader>Connexion</CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="email" value={email} onChange={handleEmailChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Mot de passe</Label>
                            <Input type="password" name="password" id="password" alue={password} onChange={handlePasswordChange}/>
                            {
                                error === 401 && (
                                    <Alert color="danger" >
                                        Connexion impossible, verifiez votre email et mot de passe
                                    </Alert>
                                )
                            }
                        </FormGroup>
                        <Button>Se connecter</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Login;
