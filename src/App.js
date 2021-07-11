import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Homepage from "./pages/Home";
import Control from "./pages/Control";
import Monitor from "./pages/Monitor";
import Select from "./pages/Select";
import Camera from "./pages/Camera";
import Visualization from "./pages/Visualization";

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
  
  return (
    <React.Fragment>
      <Switch>
        <ProtectedRoute path="/homepage" loggedIn = {log} component = {Homepage}/>
        <ProtectedRoute path="/monitor" loggedIn = {log} component = {Monitor}/>
        <ProtectedRoute path="/control" loggedIn = {log} component = {Control}/>
        <ProtectedRoute path="/select" loggedIn = {log} component = {Select}/>
        <ProtectedRoute path="/camera" loggedIn = {log} component = {Camera}/>
        <ProtectedRoute path="/visualization" loggedIn = {log} component = {Visualization}/>
        <Route path="/">{log ? <Homepage /> :<Login  state={{log :[log,setLog]}}/>}</Route>
      </Switch>
      
    </React.Fragment>
  )
}

export default App;

