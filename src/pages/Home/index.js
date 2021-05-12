import React, { useState, useEffect } from "react";
import "./homepage.css"
import homepage1 from "../../images/homepage1.png"
import journal from "../../images/journal.png"

function Homepage(){
    
    return(
        <div className="container">
          <div className="login-register-wrapper">

              <div>
              <img style={
                  {width:"120px",
                  height:"60px",
                  border:"0",
                  position: "relative",
                  top: "80px" ,
                  left:"65px"}
              } 
              src={homepage1} id="PIC1" onclick="changeFunc1()"/> 
              <img style={{
                  width:"144px",
                  height:"61px",
                  border:"0",
                  position: "relative",
                  top: "80px" ,
                  left:"120px",
              }} 
              src={journal} id="PIC2" onclick="changeFunc2()" /> 
              </div>

              <div><input  className="button button1" type="submit" value="建立植物資料"/></div>
							<div><input  className="button button2" type="submit" value="澆水"/> </div>
							<div><input  className="button button3" type="submit" value="照明"/></div>
							<div><input  className="button button4" type="submit" value="查看現況/拍照"/></div>
              
              
              

              <div className="wrapper">
                <div className="content"></div>
                  <footer className="footer"></footer>
              </div>

               {/* <input type="button" style="background-image:url(./pic/grass.png);     
               background-size:50px 60px;width:50px;height:60px;border:0; background-color: 
               transparent;position: absolute;top: 655px ;left:445px"/>

               <input type="button" style="background-image:url(./pic/book.png);     
               background-size:70px 50px;width:70px;height:50px;border:0; background-color: 
               transparent;position: absolute;top: 665px ;left:590px"/>

               <input type="button" style="background-image:url(./pic/setting.png);     
               background-size:47px 47px;width:47px;height:47px;border:0; background-color: 
               transparent;position: absolute;top: 663px ;left:770px"/> */}
               
          </div>
        </div>
    )
}

export default Homepage