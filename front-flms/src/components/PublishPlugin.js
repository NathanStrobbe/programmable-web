import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Card, CardBody, CardTitle } from 'reactstrap';
import { Button } from 'reactstrap';
import { post } from '../utils/api';
import { useHistory } from 'react-router-dom';

const PublishPlugin = () => {
    const [openSource, setOpenSource] = useState(false);
    const history = useHistory();

    const handleOpenSourceClick = (event) => {
        setOpenSource(event.target.checked);
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        post('api/plugins', data)
            .then(response => {
                console.log(response);
                if (response) {
                    history.push('/pluginsList');
                }
            })
            .catch(console.error);
    };

    return (
        <Card>
            <CardBody>
                <CardTitle><h2>Publier un plugin</h2></CardTitle>
                <Form onSubmit={handleSubmitForm}>
                    <FormGroup>
                        <Label htmlFor="publish-plugin-name">Nom du plugin</Label>
                        <Input type="text" name="name" id="publish-plugin-name" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="publish-plugin-version">Version du plugin</Label>
                        <Input type="text" name="version" id="publish-plugin-version" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="publish-plugin-description">Description</Label>
                        <Input type="textarea" name="description" id="publish-plugin-description" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="publish-plugin-image">Lien de l'image</Label>
                        <Input type="text" name="image" id="publish-plugin-image" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="publish-plugin-video">Lien du tuto</Label>
                        <Input type="text" name="video" id="publish-plugin-video" />
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" onClick={handleOpenSourceClick}/>Open source
                        </Label>
                    </FormGroup>
                    {openSource &&
                    (<FormGroup>
                        <Label for="publish-plugin-github">Lien vers Github</Label>
                        <Input type="text" name="github" id="publish-plugin-github" />
                    </FormGroup>)}
                    <FormGroup>
                        <Label for="publish-plugin-tags">Tags</Label>
                        <Input type="textarea" name="tags" id="publish-plugin-tags" />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </CardBody>
        </Card>
    );
};

export default PublishPlugin;
