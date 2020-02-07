import React, {useState} from 'react';
import { Card } from 'react-bootstrap';
import { GetPluginsList, convertBufferToBase64 } from '../utils/hooks';
import { Link } from 'react-router-dom';
import './PluginsList.css';

const PluginsList = () => {

    const { plugins } = GetPluginsList();
    const { filterPlugins, setFilterPlugins } = useState('');

    return (
        <div>
            <div>
                <p>Filter</p>
            </div>
            <div className={"containerList"}>
                {
                    plugins.map(plugins =>
                        <Card key={plugins._id} style={{ width: '18rem' }}>
                            <Card.Body>
                                <Link to={`/pluginDetails/${plugins._id}`} style={{ textDecoration: 'none' }}>
                                    <Card.Title>{plugins.name}</Card.Title>
                                    <Card.Img variant="top" src={convertBufferToBase64(plugins.image)} />
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
        </div>
    );
};

export default PluginsList;
