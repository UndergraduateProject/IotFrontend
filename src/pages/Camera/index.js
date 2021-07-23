import "./camera.css";
import webSocket from 'socket.io-client';
import {Container, Row, Col, Button} from 'react-bootstrap';
import React, { useRef, useState, useEffect } from 'react';
// import plant from "../../images/plant.jpg";
// import x from "../../images/x.png";
// import flash from "../../images/flash.png";
// import turn_camera from "../../images/turn_camera.png";
// import left_arrow from "../../images/left_arrow.png";
// import right_arrow from "../../images/right_arrow.png";
// import shutter from "../../images/shutter.png";








// this is the client side that asking for video streaming 
function Camera() {
  const [ws,setWs] = useState(null);  // socket object
  const videoRef = useRef();          // video source
  const peerConnection = new RTCPeerConnection({'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]});
  const remoteStream = new MediaStream();

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

  return(
    <div className="body_camera">
      <Container>
        {/* <Row>
          <Col className="camera_top"><img className="camera_pic1" src={ x }/></Col>
          <Col className="camera_top"><img className="camera_pic2" src={ flash }/></Col>
          <Col className="camera_top"><img className="camera_pic3" src={ turn_camera }/></Col>

        </Row>
        <Row>
          <Col><img className="body_camera" src={ plant }/></Col>
        </Row>

        <Row>
          <Col><img className="left_arrow" src={ left_arrow }/></Col>
        </Row>
        <Row>
          <Col><img className="left_arrow" src={ left_arrow }/></Col>
          <Col><img className="camera_shutter" src={ shutter }/></Col>
          <Col><img className="right_arrow" src={ right_arrow }/></Col>

        </Row>  */}

       
      <input type='button' value='connect' onClick={connectWebSocket} />
      <div>
        <video ref={videoRef} onCanPlay={handleCanPlay} style={{width:300,height:300}}/>
      </div> 
      
      </Container>
    </div>
  )
}

export default Camera;
