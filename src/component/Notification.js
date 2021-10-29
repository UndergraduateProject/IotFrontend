import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import ReactNotification from 'react-notifications-component'
import {store} from 'react-notifications-component';
import 'animate.css'
import 'react-notifications-component/dist/theme.css'

const endpoint = "http://140.117.71.98:4001"

function Notification(){
  const [response,setResponse] = useState()
  const temp = {
    title: "Warning!",
    message: "Temperature too high",
    type: "danger",
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  }

  const humid = {
    title: "Warning!",
    message: "Humidity is low " ,
    type: "danger",
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  }

  const volume ={
    title: "Warning!",
    message: "Water tank level is low!",
    type: "danger",
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  }

  useEffect(()=>{
    const socket = socketIOClient(endpoint);
    socket.on("message", data =>{
      setResponse(data)
      var msg = temp;
      switch(data){
        case "temp":
          msg = temp;
          break;

        case "humidity":
          msg = humid;
          break;
        
        case "volume":
          msg = volume;
          break;

        default:
          msg = temp
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