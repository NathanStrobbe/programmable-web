import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { post } from '../utils/api';
import { useHistory } from 'react-router-dom';

const PublishPlugin = () => {
    const [openSource, setOpenSource] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [pluginBinary, setPluginBinary] = useState(null);
    const history = useHistory();

    const handleOpenSourceClick = event => {
        setOpenSource(event.target.checked);
    };

    const handleImageUpload = event => {
        setImageFile(event.target.files[0]);
    };

    const handlePluginUpload = event => {
        setPluginBinary(event.target.files[0]);
    };

    const handleSubmitForm = event => {
        event.preventDefault();
        const data = new FormData(event.target);
        data.append('image', imageFile, imageFile.name);
        data.append('plugin', pluginBinary, pluginBinary.name);

        if (!data.linkgithub) {
            data.append('linkgithub', '');
        }

        const plugin = JSON.stringify(Object.fromEntries(data));
        console.log(plugin);

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
            <Card.Body>
                <Card.Title><h2>Publier un plugin</h2></Card.Title>
                <Form onSubmit={handleSubmitForm}>
                    <Form.Group>
                        <Form.Label htmlFor="publish-plugin-name">Nom du plugin</Form.Label>
                        <Form.Control type="text" name="name" id="publish-plugin-name" required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="publish-plugin-version">Version du plugin</Form.Label>
                        <Form.Control type="text" name="version" id="publish-plugin-version" required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="publish-plugin-description">Description</Form.Label>
                        <Form.Control type="textarea" name="description" id="publish-plugin-description" required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="publish-plugin-category">Catégorie</Form.Label>
                        <Form.Control type="text" name="category" id="publish-plugin-category" required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="publish-plugin-image">Image</Form.Label>
                        <Form.Control as="input" type="file" id="publish-plugin-image" accept="image/*" required onChange={handleImageUpload} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="publish-plugin-sources">Sources du plugin</Form.Label>
                        <Form.Control as="input" type="file" id="publish-plugin-sources" accept=".zip" required onChange={handlePluginUpload} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="publish-plugin-video">Lien du tuto</Form.Label>
                        <Form.Control type="text" name="video" id="publish-plugin-video" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            type="switch"
                            id="publish-plugin-opensource"
                            label="Open Source"
                            onClick={handleOpenSourceClick} />
                    </Form.Group>
                    {openSource &&
                        (<Form.Group>
                            <Form.Label htmlFor="publish-plugin-github">Lien vers Github</Form.Label>
                            <Form.Control type="text" name="github" id="publish-plugin-github" />
                        </Form.Group>)
                    }
                    <Form.Group>
                        <Form.Label htmlFor="publish-plugin-tags">Tags</Form.Label>
                        <Form.Control type="textarea" name="tags" id="publish-plugin-tags" />
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default PublishPlugin;
