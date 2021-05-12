import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Homepage from "./pages/Home"
import Verify from "./pages/Login/verify"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//import "/App.css";



function App() {
  const [log,setLog] = useState(false);


  return (
    <React.Fragment>
      <Router>
        <Route exact path="/">
          {log ? <Homepage/>:<Login state={{log :[log,setLog]}}/>}
        </Route>
      </Router>
      
      
    </React.Fragment>
  )
}

export default App;

