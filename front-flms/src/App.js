import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import PluginsList from './components/PluginsList';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import PublishPlugin from './components/PublishPlugin';
import PluginDetails from './components/PluginDetails';
import Shop from './components/Shop';

const App = () => {
    return (
        <main className="App">
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/" >
                        <Redirect to="/login"/>
                    </Route>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/pluginsList" component={PluginsList} />
                    <Route path="/publishPlugin" component={PublishPlugin} />
                    <Route path="/pluginDetails/:pluginId" component={PluginDetails} />
                    <Route path="/shop" component={Shop} />
                    <Redirect from='*' to='/' />
                </Switch>
            </BrowserRouter>
        </main>
    );
};

export default App;
