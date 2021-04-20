import React, { useState } from "react";
import "./App.css";
import { useSpring, animated } from "react-spring";


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

  function registerClicked() {
    setRegistartionFormStatus(true);
  }
  function loginClicked() {
    setRegistartionFormStatus(false);
  }

  return (

    <div className="login-register-wrapper">
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
        <animated.form action="" id="loginform" style={loginProps}>
          <LoginForm />
        </animated.form>
        <animated.form action="" id="registerform" style={registerProps}>
          <RegisterForm />
        </animated.form>
      </div>
      <animated.div className="forgot-panel" style={loginProps}>
        <a herf="#">Forgot password</a>
      </animated.div>
    </div>
  );
}

function LoginForm() {
  return (
    <React.Fragment>
      <input id="username" type="text" placeholder="Enter your email" />
      <input id="password" type="text" placeholder="Enter your password" />
      <br/>
      
      <input type="submit" value="submit" className="submit" />
    </React.Fragment>
  );
}

function RegisterForm() {
  return (
    <React.Fragment>
      <input id="fullname" type="text" placeholder="Create your username" />
      <input id="email" type="text" placeholder="Create your email" />
      <input id="password" type="text" placeholder="Create your password" />
      <input id="confirmpassword" type="text" placeholder="Enter  your password again" />

      <input type="submit" value="submit" class="submit" />
    </React.Fragment>
  );
}

export default App;

