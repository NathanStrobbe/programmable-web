import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import PluginsList from './components/PluginsList';
import { Route, BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import PublishPlugin from './components/PublishPlugin';

const App = () => {
    return (
        <main className="App">
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/" />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/pluginsList" component={PluginsList} />
                    <Route path="/publishPlugin" component={PublishPlugin} />
                </Switch>
            </BrowserRouter>
        </main>
    );
}

export default App;
