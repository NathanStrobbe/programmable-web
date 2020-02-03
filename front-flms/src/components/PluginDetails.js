import React from 'react';
import { Row, Col, Card, CardBody, CardText } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { GetPlugin,AddLike } from '../utils/hooks.js';
import { Button } from 'react-bootstrap';

const PluginDetails = () => {
    //const [plugin, setPlugin] = useState({name: '', version: '', category: '', image: '', description: '', tags: [], likes: []});
    console.log('#rendering pluginDetails');

    const { pluginId } = useParams();

    const click = (plugin) => {
      const myId = "test2"
      if (sessionStorage.getItem('jwtToken')) {
          console.log('connecté');
          console.log(plugin);
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
                <Row className="pluginDetailsHeader" sm='3'>
                    <Col><h1>{plugin.name}</h1></Col>
                    <Col></Col>
                    <Col><h4>Likes : {plugin.likes.length}</h4><Button variant="primary" onClick={e => click(plugin)}>Add</Button></Col>
                </Row>
                <Row className="pluginDetailsPicture" sm='3'>
                    <Col></Col>
                    <Col>{plugin.image}</Col>
                    <Col></Col>
                </Row>
                <Row className="pluginDetailsDescriptionTitle" sm='1'>
                    <Col><h4>Description:</h4></Col>
                </Row>
                <Row className="pluginDetailsDescription" sm='1'>
                    <Col>{plugin.description}</Col>
                </Row>
                <Row className="pluginDetailsCommentsTitle" sm='1'>
                    <Col><h4>Comments:</h4></Col>
                </Row>
                {
                    plugin.comments.map((comment, i) => (
                        <Row key={i} className="pluginDetailsComment" sm='1'>
                            <Card>
                                <CardBody>
                                    <CardText>
                                        {comment}
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Row>
                    ))
                }
            </div>
        );
    }
    return null;
};

export default PluginDetails;
