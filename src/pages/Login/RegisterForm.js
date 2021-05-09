import React, { useEffect, useState } from "react";
import api from '../../utils/api';
import { useSpring, animated } from "react-spring";
import show from "../../images/show.png";

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
        if(res["user"]){
          api.post("utils/mail_certification/",data["email"]).then(res =>{ //call mail function from api
            console.log(res)
            if(res["success"]){ //mail sent
              localStorage.setItem('verify',res["verify"])
            }
            else{
              alert("Mail not sent")
            }
          })
          
        }
      })
    }
  
    return (
      <animated.form action="" id="registerform" style={props.style}> 
      {/* <React.Fragment>  Now we can delete this fragment*/} 
        <input id="username" type="text" placeholder="Create your username" value={formdata.username} onChange={handleChange} />
        <input id="email" type="text" placeholder="Create your email" value={formdata.email} onChange={handleChange}/>
        <input id="password" type="text" placeholder="Create your password" value={formdata.password} onChange={handleChange} />
        <input id="confirmpassword" type="text" placeholder="Enter  your password again" value={formdata.confirmpassword} onChange={handleChange} />
  
        <input type="submit" value="submit" class="submit" onClick={regiteruser}/>
  
      
      {/* </React.Fragment> */}
      </animated.form>
    );
  }

  export default RegisterForm