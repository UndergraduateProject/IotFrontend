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
    socket.on("notification", data =>{
      store.removeAllNotifications()
      setResponse(data);
      var style = 'danger';
      if (data.title == 'Automation'){
        style = 'success'
      }
      const msg = {
        title: data.title,
        message: data.body,
        type: style,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      }
      store.addNotification(msg);
    }
    );
  })
    
    return (
      <div>
      <ReactNotification/>
      </div>
    );
  }

export default Notification;