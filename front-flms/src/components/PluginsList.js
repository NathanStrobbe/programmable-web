import React, {useState} from 'react';
import { Card, Button, Form, Col, Row } from 'react-bootstrap';
import {GetPluginsList, convertBufferToBase64, GetCategories} from '../utils/hooks';
import { Link } from 'react-router-dom';
import './PluginsList.css';

const PluginsList = () => {

    const { plugins } = GetPluginsList();
    const [ filterPlugins, setFilterPlugins ] = useState('all');
    const { categories } = GetCategories();
    const [ searchTerm, setSearchTerm ] = useState('');

    const filterList = (id) => { setFilterPlugins(id); };

    return (
        <div>
            <Row className="filter">
                <Col sm={8}>
                    <h4>Filter les résultats</h4>
                    <Button  variant="outline-primary" size="sm" onClick={ () => filterList("all") }>Tous les plugins</Button>
                    {
                        categories.map(category =>
                            <Button  size="sm" variant="outline-primary" onClick={ () => filterList(category._id) }>{category.name}</Button>
                        )
                    }
                </Col>
                <Col className="align-self-end col-sm-4">
                    <Form >
                        <Form.Control  type="" placeholder="Rechercher" name="recherche" id="recherche" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    </Form>
                </Col>
            </Row>
            <div className="containerList">
                {
                    plugins.filter(plugin => plugin.name.toLowerCase().includes(searchTerm)).map(plugins =>
                        filterPlugins === "all" || plugins.category === filterPlugins ?
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
                            </Card>: null
                    )
                }
            </div>
        </div>
    );
};

export default PluginsList;
