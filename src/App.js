import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Homepage from "./pages/Home"
import {
  Redirect,
  Route,
} from "react-router-dom";
//import "/App.css";



function App() {
  const [log,setLog] = useState(localStorage.getItem('token'));


  return (
    <React.Fragment>
            <Route path="/Homepage"><Homepage /></Route>
            {log ? <Redirect to="/Homepage"/>:<Login state={{log :[log,setLog]}}/>}
    </React.Fragment>
  )
}

export default App;

