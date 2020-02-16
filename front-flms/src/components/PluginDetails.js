import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Row, Col, Card, Container, Badge, Form } from 'react-bootstrap';
import { GetPlugin, AddLike, GetUser, GetComments, AddComment, convertBufferToBase64 } from '../utils/hooks.js';
import { useSelector } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import './PluginDetails.css';
import {GetCategories} from "../utils/hooks";

const PluginDetails = () => {


    let heart = require("../assets/heart.png");
    let heartBlank = require("../assets/heart_blank.png");
    let user = '';
    const [alertMessage, setAlertMessage] = useState(null);

    const { categories } = GetCategories();
    const { pluginId } = useParams();
    const loggedIn = useSelector(state => state.loggedIn);


    if (sessionStorage.getItem('jwtToken')) {
        user = GetUser(sessionStorage.getItem('jwtToken'));
    }

    const click = (plugin) => {
        if (sessionStorage.getItem('jwtToken')) {
            const myId = user._id;
            if (!plugin.likes.includes(myId)) {
                AddLike(plugin, myId);
                window.location.reload();
            } else {
                setAlertMessage('Vous avez déjà aimé !');
            }
        } else {
            setAlertMessage('Veuillez vous connecter !');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const comment = Object.fromEntries(data);
        if (sessionStorage.getItem('jwtToken')) {
            if (comment.commentContent.trim().length > 0) {
                const myId = user.username;
                AddComment(plugin, myId, comment.commentContent);
                window.location.reload();
            }
        } else {
            alert('Veuillez vous connecter !');
        }
    };

    const plugin = GetPlugin(pluginId);
    const comments = GetComments(pluginId);


    if (plugin === []) return null;


    if (comments) {
        console.log(comments);
    }

    function getHeart(){
        plugin.likes.map(like => {
            if (like === user._id) {
                return heart;
            } else {
                return heartBlank;
            }
        });
    };


    return (
        <Container className="pluginDetails">
            <div className="detailsHeader">
                <img className="Image" src={convertBufferToBase64(plugin.image)} alt="Plugin" />
                <div className="detailsText">
                    <div className="detailsGroup">
                        <h3>{plugin.name} {plugin.version}</h3>
                        <img onClick={() => click(plugin)} src={heart} alt="add" width="20"
                             height="20px"/>
                        {plugin.likes.length}
                    </div>
                    <p>Auteur : {plugin.creator.username}</p>

                    <p>
                        {
                            categories.map((category) => {
                                if(category._id === plugin.category)
                                    return "Catégorie " + category.name
                            })
                        }
                    </p>
                    <div>
                        {plugin.tags.map((tag) => <><Badge variant="info">{tag}</Badge></>)}
                    </div>
                    <a href={plugin.video ? plugin.video : ''} target="_blank"> {plugin.video ? "Vidéo" : ''} </a>
                    <a href={plugin.linkgithub ? plugin.linkgithub : ''}> {plugin.linkgithub ? "GitHub" : ''} </a>
                </div>
            </div>

            <div className="detailsDescription">
                <h5>Description</h5>
                <p>{plugin.description}</p>
                <Button variant="outline-secondary" onClick= {() => window.open(`http://localhost:8000/${encodeURI(plugin.name)}`, '_blank') } >Essayer le plugin</Button>
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
