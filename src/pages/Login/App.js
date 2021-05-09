import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import Userstatus from "./Userstatus"
import "./App.css";



function App() {
  const [registrationFormStatus, setRegistartionFormStatus] = useState(false);
  const loginProps = useSpring({ 
    left: registrationFormStatus ? -500 : 0, // Login form sliding positions
  });
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500, // Register form sliding positions 
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
  const registerClicked = () => {
    setRegistartionFormStatus(true);
  }
  const loginClicked = () => {
    setRegistartionFormStatus(false);
  }


  return (

    <div className="login-register-wrapper">
      <Userstatus />
      <div className="nav-buttons">
        <animated.button
          onClick={loginClicked}
          id="loginBtn"
          style={loginBtnProps}
        >

          LOGIN
        </animated.button>
        <animated.button
          onClick={registerClicked}
          id="registerBtn"
          style={registerBtnProps}
        >
          SIGN UP
        </animated.button>
      </div>
      <div className="form-group">
        {/* <animated.form action="" id="loginform" style={loginProps}> */}
          <LoginForm style={loginProps} />
        {/* </animated.form> */}
        {/* 把amimated.form這個component加入RegisterForm裡面 透過porps傳入style 上面的loginform也按照一樣的做法 這幾段comment看懂之後就可以刪掉*/ }
        {/* <animated.form action="" id="registerform" style={registerProps}> */}   
          <RegisterForm style={registerProps} />
        {/* </animated.form> */}
      </div>
      <animated.div className="forgot-panel" style={loginProps}>
        <a herf="#">Forgot password</a>    
      </animated.div>
    </div>
  );
}

export default App;

