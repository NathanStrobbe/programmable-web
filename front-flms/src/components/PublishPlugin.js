import React, { useState } from 'react';
import {Card, Form, Button, Modal, Alert} from 'react-bootstrap';
import { post } from '../utils/api';
import { useHistory } from 'react-router-dom';
import './PublishPlugin.css';
import {GetCategories} from "../utils/hooks";
import add from '../assets/plus.png';

const PublishPlugin = () => {
    const [openSource, setOpenSource] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [pluginBinary, setPluginBinary] = useState(null);
    const history = useHistory();
    const { categories } = GetCategories();
    const [show, setShow] = useState(false);
    const [optionsState, setOption] = useState('');


    const [nameCat, setNameCat] = useState('');
    const [error, setError] = useState('');


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
        data.append('category', optionsState);
        console.log(data);

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

    const handleCloseSubmit = (event) => {
        const data = new FormData();
        data.append('name', nameCat);
        post('api/categories', data)
            .then(res => {
                console.log(res);
                categories.push(res);
                setShow(false);
            }
        ).catch(err => {
            setError(409);
            console.log(error);
        });

    };


    const handlenameCatChange = (event) =>{
        setError(0);
        setNameCat(event.target.value);
    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Card>
            <Card.Header>Publier un plugin</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmitForm}>
                    <div className={"group"}>
                        <Form.Group>
                            <Form.Label htmlFor="publish-plugin-name">Nom du plugin</Form.Label>
                            <Form.Control type="text" name="name" id="publish-plugin-name" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="publish-plugin-version">Version du plugin</Form.Label>
                            <Form.Control type="text" name="version" id="publish-plugin-version" required />
                        </Form.Group>
                    </div>
                    <Form.Group>
                        <Form.Label htmlFor="publish-plugin-description">Description</Form.Label>
                        <Form.Control as="textarea" rows="3" name="description" id="publish-plugin-description" required />
                    </Form.Group>
                    <div className={"group"}>
                        <Form.Group controlId="formGridState">
                            <Form.Label>Catégorie</Form.Label>
                            <Form.Control as="select" onChange={e => setOption(e.currentTarget.value)}>
                                {
                                    categories.map(category =>
                                        <option value={category._id}>{category.name}</option>
                                    )
                                }
                            </Form.Control>
                        </Form.Group>
                        <img onClick={handleShow} src={add} alt="add" width="30px" height="30px"/>
                    </div>
                    <Form.Group>
                        <Form.Label htmlFor="publish-plugin-tags">Tags</Form.Label>
                        <Form.Control type="textarea" name="tags" id="publish-plugin-tags" />
                    </Form.Group>
                    <div className={"group"}>
                        <Form.Group>
                            <Form.Label htmlFor="publish-plugin-image">Image</Form.Label>
                            <Form.Control as="input" type="file" id="publish-plugin-image" accept="image/*" required onChange={handleImageUpload} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="publish-plugin-sources">Sources du plugin</Form.Label>
                            <Form.Control as="input" type="file" id="publish-plugin-sources" accept=".zip" required onChange={handlePluginUpload} />
                        </Form.Group>
                    </div>
                    <Form.Group>
                        <Form.Label htmlFor="publish-plugin-video">Lien du tuto</Form.Label>
                        <Form.Control type="text" name="video" id="publish-plugin-video" />
                    </Form.Group>
                    <Form.Group className={"openSource"}>
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
                    <Button type="submit" pullright="true">Enregistrer</Button>
                </Form>
            </Card.Body>




            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter une catégorie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCloseSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="nom">Nom</Form.Label>
                            <Form.Control type="" name="nom" id="nom" value={nameCat} onChange={handlenameCatChange}/>
                        </Form.Group>
                        {
                            error === 409 && (
                                <Alert variant="danger">
                                    Cette catégorie existe déjà!
                                </Alert>
                            )
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleCloseSubmit}>
                        Sauvegarder
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>


    );
};

export default PublishPlugin;
