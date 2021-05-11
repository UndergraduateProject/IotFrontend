import React, { useEffect, useState } from "react";
import api from '../../utils/api';
import { useSpring, animated } from "react-spring";
import show from "../../images/show.png";

function LoginForm(props) {
    const [formdata, setFormdata] = useState({
      username : '',
      password : '',
      hidePassword: true,
      passwordType: "password",
    });
  
    useEffect(() => {
      console.log("use effect")
      console.log(formdata.hidePassword)
      if (formdata.hidePassword) {
        formdata.passwordType = 'password'
      }
      else {
        formdata.passwordType = 'text'
      }
    });
  
    const login = e => {
      e.preventDefault();
      const data = {
        username : formdata.username,
        password : formdata.password,
      };
  
      api.post("auth/login/", data).then(res => {
        console.log(res);
        if (res.token){
          localStorage.setItem('token', res.token); // store token into localStorage(similar to cookie and  session)
          localStorage.setItem('username', res.user.username);
          window.location.href = "/";
        }
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
      console.log("test")
      setFormdata({...formdata, hidePassword: !formdata.hidePassword})
    }
  
  
  
    return (
  
  
      <animated.form action="" id="loginform" style={props.style}>
  
        <input  id="username" type="text" placeholder="Enter your username" value={formdata.username} onChange={handleChange} />
        <div key="test" className="column">
          <input  id="password" type={formdata.passwordType} placeholder="Enter your password" value={formdata.password} onChange={handleChange} />
          <img src={show} onClick={setPasswordVisibility} style={{position:'absolute',left:'350px',top:'78px',width:'20px', height:'20px', objectFit:'cover'}}/>
        </div>
  
        <br/>
  
        <input type="submit" value="submit" className="submit" onClick={login} />
      </animated.form>
  
  
    )
  }

  export default LoginForm