import React, { useState, useEffect } from "react";
import "./verify.css";
import { useSpring, animated } from "react-spring";

function Verify(props){
  const [code,setCode] = useState(0);

  const verify = () =>{
    const verify = localStorage.getItem('verify');
    console.log(verify)
    if(code == verify){ //verified, correct code
      alert("verified success")
    }
    else{
      alert("wrong code, please check again")
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
        <div className="verifySubmit" onClick={verify}>確定</div>
      </div>
    </animated.form>
  )
}

export default Verify