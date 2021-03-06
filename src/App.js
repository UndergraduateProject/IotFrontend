import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Homepage from "./pages/Home";
import Control from "./pages/Control";
import Monitor from "./pages/Monitor";
import Select from "./pages/Select";
import Camera from "./pages/Camera";
import Visualization from "./pages/Visualization";
import Warning_center from "./pages/Warning_center";
import Notification_page from "./pages/Notification_page";
import Setting from "./pages/Setting";
import Detect from "./pages/Detect";
import Profile from "./pages/Profile";
import Track from "./component/Track";
import Water from "./component/Water";
import Notification from "./component/Notification"
import Chat from "./pages/Chat";
import Auto from "./pages/Auto";
import firebase from "./firebase"
import {isMobile} from 'react-device-detect';
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom";



function App() {
  const [log,setLog] = useState(localStorage.getItem('token'));
  const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          return log ? <Comp {...props} /> : <Redirect to="/" />;
        }}
      />
    );
  };

  useEffect(()=>{
    if (!isMobile){
      const messaging = firebase.messaging();
    messaging
      .requestPermission()
      .then(()=>{
        return messaging.getToken();
      })
      .then(token =>{
        console.log("token is...", token);
      })
      .catch(error=>{
        console.log(error)
      })
    }
  },[])
  
  return (
    <React.Fragment>
      <Switch>
        <ProtectedRoute path="/homepage" loggedIn = {log} component = {Homepage}/>
        <ProtectedRoute path="/monitor" loggedIn = {log} component = {Monitor}/>
        <ProtectedRoute path="/control" loggedIn = {log} component = {Control}/>
        <ProtectedRoute path="/select" loggedIn = {log} component = {Select}/>
        <ProtectedRoute path="/camera" loggedIn = {log} component = {Camera}/>
        <ProtectedRoute path="/visualization" loggedIn = {log} component = {Visualization}/>
        <ProtectedRoute path="/auto" loggedIn = {log} component = {Auto}/>
        <ProtectedRoute path="/warning_center" loggedIn = {log} component = {Warning_center}/>
        <ProtectedRoute path="/Notification_page" loggedIn = {log} component = {Notification_page}/>
        <ProtectedRoute path="/setting" loggedIn = {log} component = {Setting}/>
        <ProtectedRoute path="/detect" loggedIn = {log} component = {Detect}/>
        <ProtectedRoute path="/profile" loggedIn = {log} component = {Profile}/>
        <ProtectedRoute path="/chat" loggedIn = {log} component = {Chat}/>
        <ProtectedRoute path="/test" loggedIn = {log} component = {Track}/>
        <Route path="/">{log ? <Homepage /> :<Login  state={{log :[log,setLog]}}/>}</Route>
      </Switch>
      <Notification />
    </React.Fragment>
  )
}

export default App;

