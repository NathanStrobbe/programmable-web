import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const Comment = ({ comment }) => {
    const commentDate = new Date(comment.date);
    return (
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
    );
};

Comment.propTypes = {
    comment: PropTypes.object
};

export default Comment;
