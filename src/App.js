import React, { useState } from "react";
import "./App.css";
import { useSpring, animated } from "react-spring";
import api from './utils/api'; // import api function which contains "GET","POST","DELETE","PATCH"

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
        {/* 把amimated.form這個component加入RegisterForm裡面 透過porps傳入style 上面的loginform也按照一樣的做法 */ }
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

function RegisterForm(props) { //設定props參數，取得從外面傳進來的style  
  const [formdata, setFormdata] = useState({  // a state contains form data
    username : '',
    email : '',
    password : '',
    confirmpassword : ''
  });
 
  const handleChange = e => {
    const {id , value} = e.target;    // 特殊用法，類似python tuple unpack
    setFormdata( prevState => ({      //特殊用法，keyword : object spread
      ...prevState,
      [id] : value,       
    }));
  }
  
  const postclient = (path) => {
    const data = { 
      username : formdata.username,
      email : formdata.email,
      password : formdata.password,
      verify : 99999,  //for testing
    }
    api.post(path, data) //post data to server/database
    .then(res => {
      console.log(res);  //print response data
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    postclient('client/'); //api url
  }

  return (
    <animated.form action="" id="registerform" style={props.style}> 
    {/* <React.Fragment>  Now we can delete this fragment*/} 
      <input id="username" type="text" placeholder="Create your username" value={formdata.username} onChange={handleChange} />
      <input id="email" type="text" placeholder="Create your email" value={formdata.email} onChange={handleChange}/>
      <input id="password" type="text" placeholder="Create your password" value={formdata.password} onChange={handleChange} />
      <input id="confirmpassword" type="text" placeholder="Enter  your password again" value={formdata.confirmpassword} onChange={handleChange} />

      <input type="submit" value="submit" class="submit" onClick={handleSubmit}/>
    {/* </React.Fragment> */}
    </animated.form>
  );
}

export default App;

