import React from 'react';
import { Row, Col, Card, CardBody, CardText } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { GetPlugin } from '../utils/hooks.js';
import { Button, Badge, Container } from 'react-bootstrap';

const PluginDetails = () => {
    //const [plugin, setPlugin] = useState({name: '', version: '', category: '', image: '', description: '', tags: [], likes: []});
    console.log('#rendering pluginDetails');

    const { pluginId } = useParams();

    const click = (likes) => {
        if (sessionStorage.getItem('jwtToken')) {
            console.log('connecté');
            console.log(likes);
        } else {
            alert('Veuillez vous connecter !');
        }
    };

    const plugin = GetPlugin(pluginId);
    if (plugin) {
        console.log(plugin);
        return (
            <div className="pluginDetails">
                <Container>
                    <Row className="justify-content-md-center">
                        <Col><h1>{plugin.name}</h1></Col>
                        <Col></Col>
                        <Col md="auto"><h4>Likes : {plugin.likes.length}</h4><Button variant="primary" onClick={e => click(plugin.likes)}>Add</Button></Col>
                    </Row>
                    <Row className="pluginDetailsPicture">
                        <Col></Col>
                        <Col>{plugin.image}</Col>
                        <Col></Col>
                    </Row>
                    <Row className="pluginDetailsCategory">

                        <Col md={{ span: 1, offset: 6 }} ><Badge variant="info">{plugin.category}</Badge></Col>

                    </Row>
                    <br/>
                    <Row className="pluginDetailsDescriptionTitle">
                        <Col><h4>Description:</h4></Col>
                    </Row>
                    <Row className="pluginDetailsDescription">
                        <Col md={{ span: 12, offset: 1 }}>{plugin.description}</Col>
                    </Row>
                    <br/>
                    <Row className="pluginDetailsCommentsTitle">
                        <Col><h4>Comments:</h4></Col>
                    </Row>
                    {
                        plugin.comments.map((comment, i) => (
                            <Container key={i}>
                                <Row className="pluginDetailsComment" md="auto">
                                    <Col md={{ span: 12, offset: 1 }}>
                                        <Card>
                                            <CardBody>
                                                <CardText>
                                                    {comment}
                                                </CardText>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <br/>
                            </Container>
                        ))
                    }
                </Container>
            </div>
        );
    }
    return null;
};

export default PluginDetails;
