import {useState, useEffect} from "react";
import Thermometer from 'react-thermometer-component'
import socketIOClient from "socket.io-client";
import api from "../utils/api";
import Notification from "./Notification"
// import "./socket.css"

const endpoint = "http://140.117.71.98:4001"
const socket = socketIOClient(endpoint);
socket.on("connect_error", () => {
    setTimeout(() => {
      socket.connect();
    }, 1000);
  });



function Temperature(){
    const [temp, setTemp] = useState(33)
    useEffect(()=>{   
        socket.on("monitor",data=>{
            data = JSON.parse(data)
            setTemp(data["temperature"])
        })
    })

    return(
        <Thermometer
            theme="light"
            value={temp}
            max="100"
            steps="3"
            format="°C"
            size="small"
        />
    )
}

export default Temperature