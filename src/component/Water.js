import {useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

const endpoint = "http://140.117.71.98:4001"
const socket = socketIOClient(endpoint);

export default function Water(){

  useEffect(()=>{
    socket.on("water", res => {
      console.log(res)
    })
  })

  const watering = () =>{
    console.log("water")
    socket.emit("water","on")
  }

  return(
    <div>
      <div onClick={watering}><button>water</button></div>
    </div>
  )
}