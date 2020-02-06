import React from 'react';
import { GetPluginsList } from '../utils/hooks';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PluginsList = () => {

    const { plugins } = GetPluginsList();

    return (
        <div>

            {
                plugins.map(plugins =>
                    <Card key={plugins._id} style={{ width: '18rem' }}>
                        <Card.Body>
                            <Link to={`/pluginDetails/${plugins._id}`} style={{ textDecoration: 'none' }}>
                                <Card.Title>{plugins.name}</Card.Title>
                                <Card.Img variant="top" src={plugins.image} />
                                <Card.Text>
                                    {plugins.description}
                                </Card.Text>
                            </Link>
                            Likes : {plugins.likes.length}<br />
                        </Card.Body>
                    </Card>
                )
            }
        </div>
    );
};

export default PluginsList;
