import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Userstatus from "./Userstatus";
import "./login.css";
import logo from "./logo.png";
import {Row, Col} from "react-bootstrap";



function Login(props) {
  const [registrationFormStatus, setRegistrationFormStatus] = useState(false);
  
  const loginProps = useSpring({ 
    left: registrationFormStatus ? -500 : 0, // Login form sliding positions
    display: registrationFormStatus ? 'none' : 'block',
  });
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500, // Register form sliding positions 
    display: registrationFormStatus? 'block':'none',
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
  const Clicked = () => {
    setRegistrationFormStatus(!registrationFormStatus);
  };

  return (

    <div className="login-register-wrapper container-fluid">
      <div className="logorow row">
      <img className="logo" src={ logo }/>
      </div>
      <Userstatus />
      <div className="nav-buttons">
        <Row>
          <Col className="d-flex justify-content-end"><animated.button onClick={Clicked} id="loginBtn" style={loginBtnProps}>LOGIN</animated.button></Col>
          <Col><animated.button onClick={Clicked} id="registerBtn" style={registerBtnProps}>SIGN UP</animated.button></Col>
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