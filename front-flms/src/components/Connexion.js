import React from 'react';
import {Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label} from "reactstrap";

const Connexion = () => {
    return (
        <div className="connexion content">
            <Card>
                <CardHeader>Connexion</CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="email" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Mot de passe</Label>
                            <Input type="password" name="password" id="password" />
                        </FormGroup>
                        <Button>Se connecter</Button>
                    </Form>
                </CardBody>
            </Card>

        </div>
    );
};

export default Connexion;
