import "./camera.css";
import webSocket from 'socket.io-client';
import {Container, Row, Col, Button} from 'react-bootstrap';
import React, { useRef, useState, useEffect } from 'react';
import plant from "../../images/plant.jpg";
import x from "../../images/x.png";
import flash from "../../images/flash.png";
import turn_camera from "../../images/turn_camera.png";
import left_arrow from "../../images/left_arrow.png";
import up_arrow from "../../images/up_arrow.png";
import down_arrow from "../../images/down_arrow.png";
import right_arrow from "../../images/right_arrow.png";
import { Link } from "react-router-dom"
import shutter from "../../images/shutter.png";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import socketIOClient from "socket.io-client";
import Sidebar from "../../component/Sidebar";
import setting from "../../images/settings.png";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom"

const endpoint = "http://140.117.71.98:4001"
const socket = socketIOClient(endpoint);


// this is the client side that asking for video streaming 
function Camera() {
  const [ws,setWs] = useState(null);  // socket object
  const videoRef = useRef();          // video source
  const peerConnection = new RTCPeerConnection({'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]});
  const remoteStream = new MediaStream();
  // taking picture
  const photo = useRef();
  const canvas = useRef();
  const width = 320;
  let history = useHistory()
 


  useEffect(async ()=>{
    if(ws){
      console.log('open connection');
      await peerinit();   // webRTC initialization
      startSignal();      // sned signal to start connection
    }
  },[ws])

  const connectWebSocket = async() => {
    setWs(webSocket("http://140.117.71.98:4001"));    // signal channel, using websocket 
  }

  const peerinit = async () => {
    peerConnection.createDataChannel('stream');
    peerConnection.addEventListener('track', getTrackAndAdd);
    peerConnection.addEventListener('connectionstatechange', successConnected);
    ws.on('rtc-message', getOfferAndSendAnswer);
    peerConnection.addEventListener('icecandidate', getIceCandidateAndSend);
    ws.on('rtc-message', getIceCandidateAndAdd);
    console.log('init finished');
  }

  const getOfferAndSendAnswer = async (message) => {
    message = JSON.parse(message);
    if (message.offer) {
      console.log('recieve offer');
      peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      ws.emit('rtc-message', JSON.stringify({'answer': answer}));
      console.log('send answer');
    }
  } 

  const getIceCandidateAndSend = async (event) => {
    if (event.candidate) {
      console.log('get icecandidate form local and send');
      ws.emit('rtc-message', JSON.stringify({'new-ice-candidate': event.candidate}));
    }
  }
  
  const getIceCandidateAndAdd = async (message) => {
    message = JSON.parse(message);
      if (message["new-ice-candidate"]) {    
        try {
          console.log('recieve ice candidate from remote');
          await peerConnection.addIceCandidate(message["new-ice-candidate"]);
        } catch (e) {
          console.error('Error adding received ice candidate', e);
        }
      }
  }
  
  const successConnected = async (event) => {
    console.log(`current state ${peerConnection.connectionState}`);
    if (peerConnection.connectionState === 'connected') {
      console.log('peer connected!');
    }
    if (peerConnection.connectionState === 'failed') {
      startSignal(); // restart
    }
  }
  
  const getTrackAndAdd = async (event) => {
    console.log('got track');
    remoteStream.addTrack(event.track, remoteStream);
    videoRef.current.srcObject = remoteStream;
    console.log(videoRef.current.srcObject);
  }
  
  const startSignal = () => {
    ws.emit('rtc-message', JSON.stringify({'start': 'GO'}));
  }

  const handleCanPlay = () => {
    console.log('play video');
    videoRef.current.play();
  }



  // taking puicture
  const takepicture = () => {
    //clearphoto();
    const height = videoRef.current.videoHeight / (videoRef.current.videoWidth/width);  

    let context = canvas.current.getContext('2d');

    if (width && height) {
      canvas.current.width = width;
      canvas.current.height = height;
      context.drawImage(videoRef.current, 0, 0, width, height);
    
      let data = canvas.current.toDataURL('image/png');
      photo.current.setAttribute('src', data);
      localStorage.setItem('capture_image', data);
      history.push('/detect')
    } 
    // else {
    //   clearphoto();
    // }
  } 

  function clearphoto() {
    let context = canvas.current.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.current.width, canvas.current.height);

    let data = canvas.current.toDataURL('image/png');
    photo.current.setAttribute('src', data);
  }

  //track moving
  useEffect(()=>{
    socket.on("slider", res =>{
      if(res == "Cannot move one"){
        alert("Cannot move on")
      }
      else{
        console.log(res)
      }
    })
  })

  const [step,setStep] = useState(250);
  const [angle, setAngle] = useState(30);

  //slide volume 
  const slide = (e,value) => {
    setStep(value);
  }

  //angle
  const turn = (e, value)=>{
    setAngle(value)
  }

  const move = (direction)=>{
    const instruction = {
      "slide":step,
      "direction":direction,
    }
    socket.emit("slider",instruction)
  }

  const moveangle = ()=>{
    const instruction = {
      "angle":angle,
    }
    socket.emit("angle", instruction)
  }


  return(
    <div className="body_camera">

      {/* <Container> */}
      <Row className="camera_top">
        <Col ><Link to="control"><img className="camera_pic1" src={ x }/></Link></Col>
        <Col ><img className="camera_pic2" src={flash} onClick={takepicture }/></Col>
        <Popup trigger={ <Col ><img className="camera_pic3" src={ setting}/></Col>} modal>
        {
              close => (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div className="camera_settings">Track steps</div>
                  <Slider min={0} max={1000} step={1} value={step} onChange={slide} valueLabelDisplay="auto" />

                  <div className="camera_settings">Camera angle</div>
                  <Slider min={0} max={180} step={1} value={angle} onChange={turn} valueLabelDisplay="auto" />
                </div>
              )
            }
        </Popup>
      </Row>
      <Row>
        <Col>
        <video className="body_camera" ref={videoRef} onCanPlay={handleCanPlay} />
        <canvas id="canvas" ref={canvas}>
        </canvas>
        <div class="output">
        <img ref={photo} id="photo" alt="The screen capture will appear in this box." /> 

        </div>
        </Col>
      </Row>
      <div><img className="up_arrow" src={ up_arrow }  onClick={()=>move("up")}/></div>
      <div><img className="left_arrow" src={ left_arrow } onClick={()=>moveangle()}/></div>
      <div><img className="camera_shutter" src={shutter} onClick={connectWebSocket}/></div>
      <div><img className="right_arrow" src={ right_arrow } onClick={()=>moveangle()}/></div>
      <div><img className="down_arrow" src={ down_arrow } onClick={()=>move("down")}/></div>

    </div>
    
  )
}

export default Camera;
