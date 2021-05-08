import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import "./App.css";
import api from './utils/api'; // import api function which contains "GET","POST","DELETE","PATCH" methods

function LoginForm(props) {
  const [formdata, setFormdata] = useState({
    username : '',
    password : '',
  });

  const login = e => {
    e.preventDefault();
    const data = {
      username : formdata.username,
      password : formdata.password,
    };
    api.post("user/login/", data).then(res => {
      console.log(res);
      if (res.token){
        localStorage.setItem('token', res.token); // store token into localStorage(similar to cookie and  session)
        localStorage.setItem('username', data.username);
        window.location.href = "/";
      }
      console.log('login fail!');
    })
  };
  
  const handleChange = e => {
    const {id, value} = e.target;
    setFormdata( prevState => ({
      ...prevState,
      [id] : value,
    }));
  };

  return (
    <animated.form action="" id="loginform" style={props.style}>
      <input id="username" type="text" placeholder="Enter your username" value={formdata.username} onChange={handleChange} />
      <input id="password" type="text" placeholder="Enter your password" value={formdata.password} onChange={handleChange} />
      <br/>
      
      <input type="submit" value="submit" className="submit" onClick={login} />
    </animated.form>
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
    const {id, value} = e.target;    // 特殊用法，類似python tuple unpack
    setFormdata( prevState => ({      //特殊用法，keyword : object spread
      ...prevState,
      [id] : value,       
    }));
  }
  
  const regiteruser = e => {
    e.preventDefault();
    const data = { 
      username : formdata.username,
      email : formdata.email,
      password : formdata.password,
    }
    api.post('user/register/', data) //post data to server/database
    .then(res => {
      console.log(res);  //print response data
    })
  }

  return (
    <animated.form action="" id="registerform" style={props.style}> 
    {/* <React.Fragment>  Now we can delete this fragment*/} 
      <input id="username" type="text" placeholder="Create your username" value={formdata.username} onChange={handleChange} />
      <input id="email" type="text" placeholder="Create your email" value={formdata.email} onChange={handleChange}/>
      <input id="password" type="text" placeholder="Create your password" value={formdata.password} onChange={handleChange} />
      <input id="confirmpassword" type="text" placeholder="Enter  your password again" value={formdata.confirmpassword} onChange={handleChange} />

      <input type="submit" value="submit" className="submit" onClick={regiteruser}/>
    {/* </React.Fragment> */}
    </animated.form>
  );
}

function Userstatus() {
  const username = localStorage.getItem('username');
  if (username){
    const handleClick = () =>{
      api.post("user/user/",{}).then(res => {
        console.log(res);
        localStorage.clear();
        window.location.href = "/";
      })
    }
    return (<div>Hello, {username} <button onClick={handleClick}>logout</button></div>);
  }
  return (null);
}

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

