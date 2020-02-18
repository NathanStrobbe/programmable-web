import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Row, Card, Container, Badge, Form } from 'react-bootstrap';
import { GetUser, convertBufferToBase64 } from '../utils/hooks.js';
import { useSelector } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import './PluginDetails.css';
import heartFill from '../assets/heart.png';
import heartBlank from '../assets/heart_blank.png';
import { get, post } from '../utils/api.js';

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

const PluginDetails = () => {
    const { pluginId } = useParams();

    const [plugin, setPlugin] = useState(defaultPlugin);
    const [category, setCategory] = useState(defaultCategory);
    const [comments, setComments] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);

    let user = '';
    const loggedIn = useSelector(state => state.loggedIn);

    useEffect(() => {
        get(`api/plugin?id=${pluginId}`)
            .then(res => res.json())
            .then(plugin => setPlugin(plugin));

        get(`api/comments?pluginId=${pluginId}`)
            .then(res => res.json())
            .then(comments => setComments(comments));
    }, [pluginId]);

    useEffect(() => {
        if (plugin.category) {
            get(`api/category?id=${plugin.category}`)
                .then(res => res.json())
                .then(category => setCategory(category));
        }
    }, [plugin]);

    if (sessionStorage.getItem('jwtToken')) {
        user = GetUser(sessionStorage.getItem('jwtToken'));
    }

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
            alert('Veuillez vous connecter !');
        }
    };

    if (plugin === []) return null;

    if (comments) {
        console.log(comments);
    }

    const heart = () => {
        for (let like of plugin.likes) {
            if (like === user._id) {
                return heartFill;
            }
        }
        return heartBlank;
    };

    return (
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
                <Button variant="outline-secondary" onClick={() => window.open(`http://localhost:8000/plugins/${encodeURI(plugin.name)}`, '_blank')} >Essayer le plugin</Button>
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
                            <>
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
                            </>
                        );
                    }
                    ) : <br />
                }
                {loggedIn ?
                    <Form onSubmit={handleSubmit} className="detailsAddComment">
                        <Form.Group>
                            <Form.Label htmlFor="commentContent">Ajouter un commentaire</Form.Label>
                            <Form.Control as="textarea" rows="3" name="commentContent" id="commentContent" required />
                        </Form.Group>
                        <Button type="submit">Commenter</Button>
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
    );
};

export default PluginDetails;
