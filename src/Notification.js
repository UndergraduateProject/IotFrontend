import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import ReactNotification from 'react-notifications-component'
import {store} from 'react-notifications-component';
import 'animate.css'
import 'react-notifications-component/dist/theme.css'

const endpoint = "http://140.117.71.98:4001"

function Notification(){
  const [response,setResponse] = useState()

  useEffect(()=>{
    const socket = socketIOClient(endpoint);
    socket.on("message", data =>{
      setResponse(data)
      store.addNotification({
        title: "Warning!",
        message: "Temperature too high :" + data,
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    }
    
    );
  })
    
    return (
      <div style={{ textAlign: "center" }}>
      <ReactNotification/>
      </div>
    );
  }

export default Notification;