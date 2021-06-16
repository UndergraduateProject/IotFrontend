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
} from "react-router-dom";
//import "/App.css";



function App() {
  const [log,setLog] = useState(localStorage.getItem('token'));


  return (
    <React.Fragment>
      <Switch>
        <Route path="/Homepage"><Homepage /></Route>
        <Route path="/Monitor"><Monitor/></Route>
        <Route path="/Control"><Control /></Route>
        <Route path="/Select"><Select /></Route>
        <Route path="/"><Login/></Route>
      </Switch>
      {/* {log ? <Redirect to="/Homepage"/>:<Login state={{log :[log,setLog]}}/>} */}
    </React.Fragment>
  )
}

export default App;

