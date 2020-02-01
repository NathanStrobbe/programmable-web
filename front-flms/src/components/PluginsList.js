import React from 'react';
import { GetPluginsList } from '../utils/hooks';
import { Card,Button,Alert } from 'react-bootstrap';
import {Link} from "react-router-dom";

const PluginsList = () => {
    const { plugins } = GetPluginsList();

  const { plugins } = GetPluginsList();

  const click = (id) =>{
    if(sessionStorage.getItem('jwtToken')){
      console.log("connecté");
      console.log(id)
    }else{
      alert("Veuillez vous connecter !");
    }
  }

  return (
    <div>
      {
        plugins.map(plugins =>

            <Card key = {plugins._id} style={{ width: '18rem' }}>
              <Card.Body>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Card.Title>{plugins.name}</Card.Title>
                <Card.Img variant="top" src={plugins.image} />
                <Card.Text>
                  {plugins.description}
                </Card.Text>
              </Link>
                Likes : {plugins.likes.length}<br/>
                <Button variant="primary" onClick={event => click(plugins.likes)}>Add</Button>
            </Card.Body>
          </Card>)
      }
    </div>
  )
}

export default PluginsList;
