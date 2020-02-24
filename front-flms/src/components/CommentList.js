import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CommentList.css';
import { Button, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get, post } from '../utils/api';
import Comment from './Comment';

const CommentList = ({ user }) => {
    const { pluginId } = useParams();

    const [comments, setComments] = useState([]);

    const loggedIn = useSelector(state => state.loggedIn);

    useEffect(() => {
        get(`api/comments?pluginId=${pluginId}`)
            .then(res => res.json())
            .then(comments => setComments(comments));

        return () => {
            setComments([]);
        };
    }, [pluginId]);

    const handleSubmitComment = event => {
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
                    'pluginId': pluginId
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

    return (
        <div className="CommentList">
            <div>
                {loggedIn ?
                    <h5>Commentaires :</h5>
                    :
                    <h5>Commentaires (connectez vous pour commenter):</h5>
                }
            </div>
            {
                comments.length > 0 ? comments.map((comment, i) => {
                    return (
                        <Row key={i} className="pluginDetailsComment">
                            <Comment comment={comment} />
                        </Row>
                    );
                }) : <br />
            }
            {loggedIn ?
                <Form onSubmit={handleSubmitComment} className="detailsAddComment">
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
    );
};

CommentList.propTypes = {
    user: PropTypes.object
};


export default CommentList;
