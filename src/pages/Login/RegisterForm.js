import React, { useEffect, useState } from "react";
import api from '../../utils/api';
import { useSpring, animated } from "react-spring";
import Verify from "./verify";
import {Row,Col,Alert} from "react-bootstrap"

function RegisterForm(props) { //設定props參數，取得從外面傳進來的style  
    const [formdata, setFormdata] = useState({  // a state contains form data
      username : '',
      email : '',
      password : '',
      confirmpassword : ''
    });
    const [verify, setVerify] = useState(false)
    const [username,setUsername] = useState(false)
    const [confirm,setConfirm] = useState(false)
   
    const handleChange = e => {
      const {id, value} = e.target;    // 特殊用法，類似python tuple unpack
      setFormdata( prevState => ({      //特殊用法，keyword : object spread
        ...prevState,
        [id] : value,       
      }));
    }
    
    const regiteruser = e => {
      e.preventDefault();
      setUsername(false)
      setConfirm(false)
  
      if(formdata.username =!''&& formdata.email!='' && formdata.password!='' && formdata.confirmpassword!='' && formdata.password === formdata.confirmpassword){
        setConfirm(false)
        const data = { 
          username : formdata.username,
          email : formdata.email,
          password : formdata.password,
          confirm : formdata.confirmpassword,
        }
        api.post('user/register/', data) //post data to server/database
        .then(res => {
          if(res["user"]){
            setVerify(true);
            api.post("utils/mail_certification/",{"mail":data["email"]}).then(res =>{ //call mail function from api
              if(res["success"]){ //mail sent
                localStorage.setItem('verify',res["verify"]);
              }
              else{
                alert("Mail not sent");
              }
            })
          }
          else if(res["username"]){
            setUsername(true)
          }
        })
      }
      else{
        setConfirm(true)
      }
    }
    
    if (verify){
      return(<Verify style={props.style}/>)
    }
    return (
      <animated.form action="" id="registerform" style={props.style}> 
        <Row><input id="username" type="text" placeholder="Create your username" value={formdata.username} onChange={handleChange} /></Row>
        {username && 
        <Row>
          <Col><Alert variant="warning">A user with that username already exists.</Alert></Col>
        </Row>
        }
        <Row><input id="email" type="text" placeholder="Create your email" value={formdata.email} onChange={handleChange}/></Row>
        <Row><input id="password" type="password" placeholder="Create your password" value={formdata.password} onChange={handleChange} /></Row>
        <Row><input id="confirmpassword" type="password" placeholder="Enter  your password again" value={formdata.confirmpassword} onChange={handleChange} /></Row>
        {confirm && <Row>
          <Col><Alert className="alert_password2" variant="warning">Please check the password and all the fields.</Alert></Col>
        </Row>}
        <Row><input type="submit" value="submit" className="submit" onClick={regiteruser}/></Row>
      </animated.form>
    );
  }

  export default RegisterForm

