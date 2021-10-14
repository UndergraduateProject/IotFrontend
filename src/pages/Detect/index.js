import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./detect.css"
import detect_pc1 from "../../images/detect_pc1.png";
import detect_pc2 from "../../images/detect_pc2.png";
import detect_pc3 from "../../images/detect_pc3.png";
import detect_slider_pc1 from "../../images/detect_slider_pc1.png";
import detect_slider_pc2 from "../../images/detect_slider_pc2.png";
import detect_slider_pc3 from "../../images/detect_slider_pc3.png";
import detect_slider_pc4 from "../../images/detect_slider_pc4.png";
import ProgressBar from 'react-bootstrap/ProgressBar'
import Carousel from 'react-elastic-carousel'
import styled from "styled-components"
import Sidebar from '../../component/Sidebar'
import { useRef, useState, useEffect } from 'react';
import webSocket from 'socket.io-client';
import api from '../../utils/api';
import { useHistory } from "react-router";

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  // background-color: green;
  width: 100%;
  // height: 150px;
  // margin: 15px;
`

function Detect() {
  //const [ws,setWs] = useState(null);  // socket object
  let ws;
  const [total, setToal] = useState(0);
  const [progress,setProg] = useState(0);
  const [raw_image, setRaw] = useState('')
  const [yolo_image, setYolo] = useState('');
  const [result, setResult] = useState([]);
  const [current, SetCurrent] = useState({});
  const src_prefix = 'http://140.117.71.98:8000';
  const [selected, setSelected] = useState(0);
  let history = useHistory()

  useEffect(async ()=>{
    if (!localStorage.getItem('capture_image')){
      history.push('/camera')
    }
    ws = await conn();
    ws.on('progress', getProgress);
    sendpicture();
  },[]);

  useEffect(()=>{
    if(result.length === 1){
      SetCurrent(result[0]);
    }
  },[result]);
  
  const conn = async () =>{
    console.log('connecting');
    return webSocket("http://140.117.71.98:4001");
  }

  const getProgress = (message) =>{
    //message = JSON.parse(message); 
    if (message["total"]){
      setToal(message["total"]);
    }
    if (message["current"]){
      setProg(message["current"]);
    }
    if (message["raw_image"]){
      console.log('raw image : '+message["raw_image"]);
      setRaw(src_prefix+message["raw_image"]);
    }
    if (message["yolo_image"]){
      setYolo(src_prefix+message["yolo_image"]);
    }
    if (message['crop_image']&&message['cam_image']&&message['prediction']){
      const prediction = JSON.parse(message['prediction']);
      //console.log(prediction);
      console.log(src_prefix + message['crop_image']);
      setResult(result => [...result, { 'open': false, 'crop': src_prefix + message['crop_image'], 'cam': src_prefix + message['cam_image'], 'prediction': prediction }])
    }
  }

  
  const sendpicture = async () => {
    const url = "api/Plantimg/";
    const data = { 'image': localStorage.getItem('capture_image'), 'sensor': 'sensor1' };
    api.post(url, data)
      .then(res => {
        console.log('done');
      })
  }

  return (
    <div className="detect_body">
      <Sidebar />
      <div className="progressContainer">
        <img className="detect_pc1" src={yolo_image?yolo_image:detect_pc1 }/>
        <ProgressBar className="progressBar" animated now={progress/total*100} />
        <div className="progressBar_detail"> {progress}/{total} </div>
      </div>
      <div className="detect_background">
        <div className="detect-photo-change">
          <img className="detect_pc2" src={current.crop?current.crop:detect_pc2}/>
          <div className="detect_arrow"> {">>>"} </div>
          <img className="detect_pc3" src={current.cam?current.cam:detect_pc3}/> 
        </div>
        <div className="detect_status">Status Analysis </div>
        <div className="detect_detail">
          {current.prediction ? Object.keys(current.prediction).map((cate) => (
           <p>{cate} {"->"} {Math.round((current.prediction[cate] + Number.EPSILON) * 100)}%</p>
          )) : <p>Loading......</p>}
        </div> 


      </div>
      <div className="carousel-container">
        <Carousel itemPadding={[0, 10]} className="detect_slider_adjust" itemsToShow={3}>
          {result.map((item, index) => (
            <Item key={index} onClick={()=>{setSelected(index);SetCurrent(result[index])}} >
              {selected===index ? <img className="detect_slider_pc_selected" src={item.crop}/> :<img className="detect_slider_pc" src={item.crop}/> } 
            </Item>
          ))}                        
        </Carousel>
        
      </div>
    </div>
    )
  }
  
export default Detect;
           