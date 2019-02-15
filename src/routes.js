import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Account from './components/Account/Account';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NewProject from './components/NewProject/NewProject';
import Register from './components/Register/Register';
import UploadVideo from './components/UploadVideo/UploadVideo';
import VideoLibrary from './components/VideoLibrary/VideoLibrary';
import Viewer from './components/Viewer/Viewer';

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/account' component={Account} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/library' component={VideoLibrary} />
        <Route path='/login' component={Login} />
        <Route path='/newproject' component={NewProject} />
        <Route path='/register' component={Register} />
        <Route path='/upload' component={UploadVideo} />
        <Route path='/viewer/:project' component={Viewer} />
    </Switch>
)