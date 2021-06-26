import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./login.css";
import logo from "./logo.png";
import {Row, Col} from "react-bootstrap";



function Login(props) {
  const [registrationFormStatus, setRegistrationFormStatus] = useState(false);
  
  const loginProps = useSpring({ 
    left: registrationFormStatus ? -500 : 0, // Login form sliding positions
    display: registrationFormStatus ? 'none' : 'block',
    opacity: registrationFormStatus ? 0 : 1,
  });
  
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500, // Register form sliding positions 
    display: registrationFormStatus? 'block':'none',
    opacity: registrationFormStatus ? 1 : 0,

  });

  const loginBtnProps = useSpring({
    borderBottom: registrationFormStatus 
      ? "solid 0px transparent"
      : "solid 2px #754907",  //Animate bottom border of login button
  });
  const registerBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 2px #754907"
      : "solid 0px transparent", //Animate bottom border of register button
  });

  // 像這種在裡面的function盡量寫成arrow function
  // 像這種在裡面的function盡量寫成arrow function
  const registerClicked = () => {
    setRegistrationFormStatus(true);
  }
  const loginClicked = () => {
    setRegistrationFormStatus(false);
  }

  return (

    <div className="login-register-wrapper container-fluid">
      <div className="logorow row">
      <img className="logo" src={ logo }/>
      </div>
      <div className="nav-buttons">
        <Row>
          <Col className="d-flex justify-content-end"><animated.button onClick={loginClicked} id="loginBtn" style={loginBtnProps}>LOGIN</animated.button></Col>
          <Col><animated.button onClick={registerClicked} id="registerBtn" style={registerBtnProps}>SIGN UP</animated.button></Col>
        </Row>
      </div>
      <div className="form-group">
          <LoginForm style={loginProps} state={props.state}/>
          <RegisterForm style={registerProps} />
      </div>
      <animated.div className="forgot-panel" style={loginProps}>
        <a className="forgot" herf="#">Forgot password</a>    
      </animated.div>
    </div>
  );
};

export default Login;