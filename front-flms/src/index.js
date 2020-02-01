import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Connexion from "./components/Connexion";
import PluginsList from "./components/PluginsList";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./components/Header";
import Register from "./components/Register";

const routing = (
    <Router>
        <Header/>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/connexion" component={Connexion}/>
            <Route path="/register" component={Register}/>
            <Route path="/pluginsList" component={PluginsList}/>
        </Switch>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
