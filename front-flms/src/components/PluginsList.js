import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Col, Row } from 'react-bootstrap';
import { convertBufferToBase64 } from '../utils/utils';
import { Link } from 'react-router-dom';
import './PluginsList.css';
import { get } from '../utils/api';
import { useSelector } from 'react-redux';
import load from '../assets/load.gif';

const PluginsList = () => {
    const [plugins, setPlugins] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filterPlugins, setFilterPlugins] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const loggedIn = useSelector(state => state.loggedIn);



    const filterList = id => {
        setFilterPlugins(id);
    };

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        if (!loggedIn) {
            get('api/plugins/shop')
                .then(res => res.json())
                .then(plugins => setPlugins(plugins));
        } else {
            get('api/plugins')
                .then(res => res.json())
                .then(plugins => setPlugins(plugins));
        }

        get('api/categories')
            .then(res => res.json())
            .then(categories => setCategories(categories));

        return () => {
            setPlugins([]);
            setCategories([]);
        };
    }, [loggedIn]);

    return (
        <div className="contentList">
            <Row className="filter">
                <Col sm={8}>
                    <h4>Filter les résultats</h4>
                    <Button variant="outline-primary" size="sm" onClick={() => filterList('all')}>Tous les plugins</Button>
                    {
                        loggedIn ?
                            <Button size="sm" variant="outline-primary" onClick={() => filterList(true)}>Plugins validés</Button>: null
                    }

                    {
                        categories.map((category, i) =>
                            <Button key={i} size="sm" variant="outline-primary" onClick={() => filterList(category._id)}>{category.name}</Button>
                        )
                    }
                </Col>
                <Col className="align-self-end col-sm-4">
                    <Form >
                        <Form.Control type="" placeholder="Rechercher" name="recherche" id="recherche" value={searchTerm} onChange={handleSearch} />
                    </Form>
                </Col>
            </Row>

            <Row className="containerList">
                {
                    plugins.length > 0 ? null : <Col className="listCharge"><img src={load} alt="load" width="150px" height="150px" /></Col>
                }
                {
                    plugins.filter(plugin => plugin.name.toLowerCase().includes(searchTerm.toLowerCase())).map((plugin, i) =>
                        filterPlugins === 'all' || plugin.category === filterPlugins || plugin.validated === filterPlugins ?
                            <Col key={i}>
                                <Card key={plugin._id} style={{ width: '18rem', maxHeight: '270px', minHeight: '270px' }} className="cardPluginList">
                                    <Card.Body>
                                        <Link to={`/pluginDetails/${plugin._id}`} style={{ textDecoration: 'none' }} className="listPluginDetails">
                                            <Card.Title>{plugin.name}</Card.Title>
                                            <Card.Img variant="top" src={convertBufferToBase64(plugin.image)} style={{ maxWidth: '17rem'}} />
                                            <Card.Text>
                                                {plugin.description.substr(0, 50)}
                                                {plugin.description.substr(0, 50) === plugin.description ? null : ' ...'}
                                            </Card.Text>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                            : null
                    )
                }
            </Row>
        </div>
    );
};

export default PluginsList;
