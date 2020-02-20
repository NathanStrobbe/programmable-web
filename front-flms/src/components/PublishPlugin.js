import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Modal, Alert } from 'react-bootstrap';
import { post, get } from '../utils/api';
import { useHistory } from 'react-router-dom';
import './PublishPlugin.css';
import add from '../assets/plus.png';
import quit from '../assets/quit.png';

const PublishPlugin = () => {
    const history = useHistory();

    const [openSource, setOpenSource] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [pluginBinary, setPluginBinary] = useState(null);
    const [categories, setCategories] = useState([]);
    const [optionCat, setOptionCat] = useState('none');
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');
    const [show, setShow] = useState(false);
    const [nameCat, setNameCat] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        get('api/categories')
            .then(res => res.json())
            .then(categories => setCategories(categories));
        return () => {
            setCategories([]);
        };
    }, []);

    const handleOpenSourceClick = event => {
        setOpenSource(event.target.checked);
    };

    const handleImageUpload = event => {
        setImageFile(event.target.files[0]);
    };

    const handlePluginUpload = event => {
        setPluginBinary(event.target.files[0]);
    };

    const handleOptionChange = event => {
        setOptionCat(event.target.value);
    };

    const handleAddTag = () => {
        if (tag !== '' && tags.indexOf(tag) === -1) {
            setTags(old => [...old, tag]);
            setTag('');
        }
    };

    const handleDeleteTag = index => {
        setTags(old => {
            old.splice(index, 1);
            return [...old];
        });
    };

    const handleTagChange = event => {
        setTag(event.target.value);
    };

    const handleSubmitForm = event => {
        event.preventDefault();
        const data = new FormData(event.target);

        setError(0);

        data.append('creator', sessionStorage.getItem('jwtToken'));
        data.append('image', imageFile, imageFile.name);
        console.log(pluginBinary);
        data.append('plugin', pluginBinary, pluginBinary.name);
        data.append('category', optionCat);
        data.delete('tags');
        data.append('tags', tags);

        if (!data.linkgithub) {
            data.append('linkgithub', '');
        }

        const plugin = Object.fromEntries(data);

        if (plugin.image.size > 100000) {
            alert('Image trop grande (elle doit être inférieure à 100 ko) !');
            return;
        }

        if (optionCat === 'none') {
            alert('Vous devez sélectionner une catégorie !');
            return;
        }

        post('api/plugins', data)
            .then(response => {
                console.log(response);
                if (response) {
                    history.push('/pluginsList');
                }
            })
            .catch(err => {
                if (err)
                    setError(410);
            });
    };


    //Methods category add modale
    const handlenameCatChange = event => {
        setError(0);
        setNameCat(event.target.value);
        setOptionCat(event.target.value);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseSubmit = () => {
        const data = new FormData();
        data.append('name', nameCat);
        post('api/categories', data)
            .then(res => res.json())
            .then(category => {
                console.log(category);
                setCategories([...categories, category]);
                setShow(false);
            }).catch(err => {
                console.error(err);
                setError(409);
            });
    };

    return (
        <Card>
            <Card.Header>Publier un plugin</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmitForm}>
                    <div className="group">
                        <Form.Group>
                            <Form.Label htmlFor="publish-plugin-name">Nom du plugin</Form.Label>
                            <Form.Control type="text" name="name" id="publish-plugin-name" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="publish-plugin-version">Version du plugin</Form.Label>
                            <Form.Control type="text" name="version" id="publish-plugin-version" required />
                        </Form.Group>
                    </div>
                    {
                        error === 410 && (
                            <Alert variant="danger" >
                                Ce titre existe déjà
                            </Alert>
                        )
                    }
                    <Form.Group>
                        <Form.Label htmlFor="publish-plugin-description">Description</Form.Label>
                        <Form.Control as="textarea" rows="3" name="description" id="publish-plugin-description" required />
                    </Form.Group>
                    <div className="group">
                        <Form.Group controlId="formGridState">
                            <Form.Label>Catégorie</Form.Label>
                            <Form.Control as="select" defaultValue={'none'}
                                onChange={handleOptionChange}>
                                <option value={'none'}>Aucune</option>
                                {
                                    categories.map((category, i) =>
                                        <option key={i} value={category.name}>{category.name}</option>
                                    )
                                }
                            </Form.Control>
                        </Form.Group>
                        <img onClick={handleShow} src={add} alt="add" width="30px" height="30px" />
                    </div>
                    <Form.Label htmlFor="publish-plugin-tags">Tags</Form.Label>
                    <div className="group">
                        {
                            tags.map((tag, index) =>
                                <div key={index} className="tags">
                                    <p>{tag}</p>
                                    <img onClick={() => handleDeleteTag(index)} src={quit} alt="quit" width="30px" height="30px" />
                                </div>
                            )
                        }
                    </div>
                    <div className="groupAddTag">
                        <Form.Group>
                            <Form.Control type="textarea" name="tags" id="publish-plugin-tags" value={tag} onChange={handleTagChange} />
                        </Form.Group>
                        <Button onClick={handleAddTag}>Ajouter</Button>
                    </div>
                    <div className="group">
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
                    <Form.Group className="openSource">
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
                            <Form.Control type="" name="nom" id="nom" value={nameCat} onChange={handlenameCatChange} />
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
