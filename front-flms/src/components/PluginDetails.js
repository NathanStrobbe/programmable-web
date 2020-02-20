import React, { useState, useEffect } from 'react';
import {NavLink, useHistory, useParams} from 'react-router-dom';
import {Button, Row, Card, Container, Badge, Form, Breadcrumb} from 'react-bootstrap';
import { convertBufferToBase64 } from '../utils/utils';
import { useSelector } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import './PluginDetails.css';
import heartFill from '../assets/heart.png';
import heartBlank from '../assets/heart_blank.png';
import { get, post } from '../utils/api.js';
import Navbar from "react-bootstrap/esm/Navbar";
import PluginsList from "./PluginsList";

const defaultPlugin = {
    name: '',
    version: '',
    description: '',
    likes: [],
    creator: {},
    image: null,
    category: '',
    tags: [],
    video: '',
    linkgithub: '',
    openSource: false,
    validated: false
};

const defaultCategory = {
    name: ''
};

const defaultUser = {
    username: '',
    password: '',
    email: ''
};

const PluginDetails = () => {

    const history = useHistory();
    const { pluginId } = useParams();

    const [user, setUser] = useState(defaultUser);
    const [plugin, setPlugin] = useState(defaultPlugin);
    const [category, setCategory] = useState(defaultCategory);
    const [comments, setComments] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);

    const loggedIn = useSelector(state => state.loggedIn);

    const userToken = sessionStorage.getItem('jwtToken');

    useEffect(() => {
        get(`api/plugin?id=${pluginId}`)
            .then(res => res.json())
            .then(plugin => setPlugin(plugin));

        get(`api/comments?pluginId=${pluginId}`)
            .then(res => res.json())
            .then(comments => setComments(comments));

        return () => {
            setPlugin(defaultPlugin);
            setComments([]);
        };
    }, [pluginId]);

    useEffect(() => {
        if (plugin.category) {
            get(`api/category?id=${plugin.category}`)
                .then(res => res.json())
                .then(category => setCategory(category));
        }
        return () => {
            setCategory(defaultCategory);
        };
    }, [plugin]);

    useEffect(() => {
        get(`api/user?token=${userToken}`)
            .then(res => res.json())
            .then(user => setUser(user));
        return () => {
            setUser(defaultUser);
        };
    }, [userToken]);

    const click = plugin => {
        if (sessionStorage.getItem('jwtToken')) {
            const myId = user._id;
            if (!plugin.likes.includes(myId)) {
                post('api/plugin', JSON.stringify({
                    'name': plugin.name,
                    'user': myId
                }), 'application/json')
                    .then(res => res.json())
                    .then(updatedPlugin => setPlugin(updatedPlugin.data));
            } else {
                setAlertMessage('Vous avez déjà aimé !');
            }
        } else {
            setAlertMessage('Veuillez vous connecter !');
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        const data = new FormData(event.target);
        const comment = Object.fromEntries(data);
        if (sessionStorage.getItem('jwtToken')) {
            if (comment.commentContent.trim().length > 0) {
                const now = new Date();
                console.log(now);

                post('api/comments', JSON.stringify({
                    'writer': user.username,
                    'content': comment.commentContent.trim(),
                    'date': now,
                    'pluginId': plugin._id
                }), 'application/json')
                    .then(res => res.json())
                    .then(comments => {
                        setComments(comments);
                        document.getElementById('commentContent').value = '';
                    });
            }
        } else {
            setAlertMessage('Veuillez vous connecter !');
        }
    };

    const heart = () => {
        for (let like of plugin.likes) {
            if (like === user._id) {
                return heartFill;
            }
        }
        return heartBlank;
    };

    if (plugin === defaultPlugin) return null;

    const handleBackButton = () =>{
        history.push('/pluginsList');
    };

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item onClick={handleBackButton}>Liste des plugins</Breadcrumb.Item>
                <Breadcrumb.Item active>Détail</Breadcrumb.Item>
            </Breadcrumb>
            <Container className="pluginDetails">
                <div className="detailsHeader">
                    <img className="Image" src={convertBufferToBase64(plugin.image)} alt="Plugin" />
                    <div className="detailsText">
                        <div className="detailsGroup">
                            <h3>{plugin.name} {plugin.version}</h3>
                            <img onClick={() => click(plugin)} src={heart()} alt="Add a like" width="20" height="20px" style={{ cursor: 'pointer' }} />
                            {plugin.likes.length}
                        </div>
                        <p>Auteur : {plugin.creator.username}</p>

                        <p>Catégorie : {category.name}</p>
                        <div>
                            {
                                plugin.tags.map((tag, i) => <Badge key={i} variant="info">{tag}</Badge>)
                            }
                        </div>
                        <a href={plugin.video ? plugin.video : ''} target="_blank" rel="noopener noreferrer"> {plugin.video ? 'Vidéo' : ''} </a>
                        <a href={plugin.linkgithub ? plugin.linkgithub : ''}> {plugin.linkgithub ? 'GitHub' : ''} </a>
                    </div>
                </div>

                <div className="detailsDescription">
                    <h5>Description</h5>
                    <p>{plugin.description}</p>
                    <div className="detailsButtonGroup">
                        <Button variant="outline-secondary" onClick={() => window.open(`http://localhost:8000/plugins/${encodeURI(plugin.name)}?dt=${new Date().getTime()}`, '_blank')} >Essayer le plugin</Button>
                        <Button variant="outline-secondary" onClick={() => window.open(`http://localhost:8000/testers/testPluginWithMocha.html?urlPlugin=${encodeURI(plugin.name)}&dt=${new Date().getTime()}`, '_blank')} >Valider le plugin</Button>
                    </div>
                </div>

                <div className="detailsComments">
                    <div>
                        {loggedIn ?
                            <h5>Commentaires :</h5>
                            :
                            <h5>Commentaires (connectez vous pour commenter):</h5>
                        }
                    </div>
                    <a href={plugin.video ? plugin.video : ''} target="_blank" rel="noopener noreferrer"> {plugin.video ? 'Vidéo' : ''} </a>
                    <a href={plugin.linkgithub ? plugin.linkgithub : ''}> {plugin.linkgithub ? 'GitHub' : ''} </a>
                </div>
            </div>

            <div className="detailsDescription">
                <h5>Description</h5>
                <p>{plugin.description}</p>
                <Button variant="outline-secondary" onClick={() => window.open(`http://localhost:8000/plugins/${encodeURI(plugin.name)}?dt=${new Date().getTime()}`, '_blank')} >Essayer le plugin</Button>
                <Button variant="outline-secondary" onClick={() => window.open(`http://localhost:8000/testers/testPluginWithMocha.html?urlPlugin=http://localhost:8000/plugins/${encodeURI(plugin.name)}`, '_blank')} >Valider le plugin</Button>
            </div>

            <div className="detailsComments">
                <div>
                    {loggedIn ?
                        <h5>Commentaires :</h5>
                        :
                        <h5>Commentaires (connectez vous pour commenter):</h5>
                    }
                </div>
                {
                    comments.length > 0 ? comments.map((comment, i) => {
                        const commentDate = new Date(comment.date);
                        return (
                                <Row key={i} className="pluginDetailsComment">
                                    <Card className="w-100">
                                        <Card.Body>
                                            <Card.Title>
                                                <div>
                                                    <span style={{ float: 'left' }}><b>{comment.writer}</b></span>
                                                    <span style={{ float: 'right' }}>
                                                        {commentDate.toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <br />
                                            </Card.Title>
                                            <Card.Text>
                                                {comment.content}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                        );
                    }
                    {loggedIn ?
                        <Form onSubmit={handleSubmit} className="detailsAddComment">
                            <Form.Group>
                                <Form.Label htmlFor="commentContent">Ajouter un commentaire</Form.Label>
                                <Form.Control as="textarea" rows="3" name="commentContent" id="commentContent" required />
                            </Form.Group>
                            <Button type="submit" variant="outline-secondary">Commenter</Button>
                        </Form>
                        :
                        <p></p>
                    }
                </div>
                <SweetAlert
                    show={alertMessage}
                    title="Erreur"
                    text={alertMessage}
                    type="error"
                    onConfirm={() => setAlertMessage('')}
                />
            </Container>
        </div>
    );
};

export default PluginDetails;
