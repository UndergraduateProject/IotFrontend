import React, { useEffect, useState } from "react";
import api from '../../utils/api';
import { useSpring, animated } from "react-spring";
import show from "../../images/show.png";
import {Alert} from "react-bootstrap";

function LoginForm(props) {
    const [formdata, setFormdata] = useState({
      username : '',
      password : '',
      hidePassword: true,
      passwordType: "password",
    });

    const [credentials,setCredentials] = useState(false);
    const [msg,setMsg] = useState("");
  
    useEffect(() => {
      if (formdata.hidePassword) {
        formdata.passwordType = 'password'
      }
      else {
        formdata.passwordType = 'text'
      }
    });
  
    const {
      log : [log,setLog]
    } = {
      log : useState(false),
      ...(props.state || {})
    }
    
    const login = e => {
      e.preventDefault();
      const data = {
        username : formdata.username,
        password : formdata.password,
      };
      api.post("user/login/", data).then(res => {
        if (res.token){
          localStorage.setItem('token', res.token); // store token into localStorage(similar to cookie and  session)
          localStorage.setItem('username', data["username"]);
          setLog(true);
        }
        else if(res.username){
          setMsg("Field may not be blank");
        }
        else {
          setMsg("Wrong username or password");
        }
        setCredentials(true);
      })
    };
  
    const handleChange = e => {
      const {id, value} = e.target;
      setFormdata( prevState => ({
        ...prevState,
        [id] : value,
      }));
    };
  
    const setPasswordVisibility = () => {
      setFormdata({...formdata, hidePassword: !formdata.hidePassword})
    }
  
    return (
      <animated.form action="" id="loginform" style={props.style}>
        <div className="row"><input  id="username" type="text" placeholder="Enter your username" value={formdata.username} onChange={handleChange} /></div>
        <div key="test" className="row">
          <input  id="password" type={formdata.passwordType} placeholder="Enter your password" value={formdata.password} onChange={handleChange} />
          <img src={show} onClick={setPasswordVisibility} style={{position:'absolute',left:'345px',top:'115px',width:'30px', height:'30px', objectFit:'cover'}}/>
        </div>
        {credentials && <Alert variant="warning">{msg}</Alert>}
  
        <br/>
        <input type="submit" value="submit" className="submit" onClick={login} />
      </animated.form>
    )
  }

  export default LoginForm