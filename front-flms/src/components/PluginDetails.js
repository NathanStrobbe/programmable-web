import React from 'react';
import { useParams } from 'react-router-dom';
import { GetPlugin,AddLike, GetUser } from '../utils/hooks.js';
import { Badge, Container } from 'react-bootstrap';
import { Row, Col, Card, Button } from 'react-bootstrap';

const PluginDetails = () => {
    //const [plugin, setPlugin] = useState({name: '', version: '', category: '', image: '', description: '', tags: [], likes: []});
    console.log('#rendering pluginDetails');
    let user = ''
    const { pluginId } = useParams();
    if (sessionStorage.getItem('jwtToken')) {
      user = GetUser(sessionStorage.getItem('jwtToken'));
    }

    const click = (plugin) => {
      if (sessionStorage.getItem('jwtToken')) {
        const myId = user._id;
        if(!plugin.likes.includes(myId)){
          AddLike(plugin,myId)
          window.location.reload();
        }else {
          alert('Vous avez deja aimé !');
        }
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
                                            <Card.Body>
                                                <Card.Text>
                                                    {comment}
                                                </Card.Text>
                                            </Card.Body>
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
