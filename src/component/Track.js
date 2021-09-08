import {useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import Slider from '@material-ui/core/Slider';

const endpoint = "http://140.117.71.98:4001"
const socket = socketIOClient(endpoint);

function Track(){
  useEffect(()=>{
    socket.on("slider", res =>{
      console.log("received instrusction, moving...")
    })
  })

  const [step,setStep] = useState(250);
  const [current, setCurrent] = useState(0);

  //slide volume 
  const slide = (e,value) => {
    setStep(value);
  }

  const move = (direction)=>{
    console.log("hello")
    console.log("moving" +step + "steps")
    var position = current;
    if(direction == "up" && current>0){
      setCurrent(current-step)
      position = current-step
      console.log(current)
    }
    else if(direction=="down" && current<1000){
      setCurrent(current+step)
      console.log(current)
      position = current+step
    }
    const instruction = {
      "slide":step,
      "direction":direction,
      "current":position,
    }
    socket.emit("slider",instruction)
  }

  return(
    <div>
      <div onClick={()=>move("up")}><button>UP</button></div>
      <div onClick={()=>move("down")}><button>Down</button></div>
      <Slider min={0} max={1000} step={1} value={step} onChange={slide} valueLabelDisplay="auto"/>
    </div>
  )
}

export default Track;