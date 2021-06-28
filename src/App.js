import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Homepage from "./pages/Home";
import Control from "./pages/Control";
import Monitor from "./pages/Monitor";
import Select from "./pages/Select";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";



function App() {
  const [log,setLog] = useState(localStorage.getItem('token'));
  let history = useHistory()
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
        <ProtectedRoute path="/Homepage" loggedIn = {log} component = {Homepage}/>
        <ProtectedRoute path="/Monitor" loggedIn = {log} component = {Monitor}/>
        <ProtectedRoute path="/Control" loggedIn = {log} component = {Control}/>
        <ProtectedRoute path="/Select" loggedIn = {log} component = {Select}/>
        <Route path="/">{log ? <Homepage /> :<Login  state={{log :[log,setLog]}}/>}</Route>
      </Switch>
      
    </React.Fragment>
  )
}

export default App;

