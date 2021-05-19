import React, { useState, useEffect } from "react";
import "./verify.css";
import { useSpring, animated } from "react-spring";
import {Alert} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Verify(props){
  const [code,setCode] = useState(0);
  const [showAlert,setShowAlert] = useState(false);
  const [msg,setMsg] = useState("驗證碼錯誤");
  const [variant,setVariant] = useState("danger");

  const verify = () =>{
    const verify = localStorage.getItem('verify');
    if(code == verify){ //verified, correct code
      setMsg("驗證碼正確");
      setVariant("success")
      setShowAlert(true);
      localStorage.removeItem('verify');
    }
    else{
      setMsg("驗證碼錯誤");
      setShowAlert(true);
    }
  }


  return(
    <animated.form action="" id="registerform" style={props.style}> 
      <div className="verify">
        <div className="letterSize">獲取驗證碼<br/></div>
        <br/>已發送4位數驗證碼至您的信箱:
        <form>
        <input type="text" name="欄位名稱" onChange={(e)=>{setCode(e.target.value)}}/>
        </form>
        {showAlert && <Alert variant={variant}>{msg}</Alert>}
        <div className="verifySubmit" onClick={verify}>確定</div>
      </div>
    </animated.form>
  )
}

export default Verify