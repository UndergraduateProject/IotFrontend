import "./analyze.css";
import ProgressBar from 'react-bootstrap/ProgressBar'
import React, { useRef, useState, useEffect } from 'react';
import webSocket from 'socket.io-client';
import api from '../../utils/api';
import { CardColumns } from "react-bootstrap";
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';

// this is the client side that asking for video streaming 
function Analyze() {
  //const [ws,setWs] = useState(null);  // socket object
  let ws;
  const [total, setToal] = useState(0);
  const [progress,setProg] = useState(0);
  const [raw_image, setRaw] = useState('')
  const [yolo_image, setYolo] = useState('');
  // const [crop_image, setCrop] = useState([]);
  // const [cam_image, setCam] = useState([]);
  const [result, setResult] = useState([]);
  const src_prefix = 'http://127.0.0.1:8000';
  //const [open, setOpen] = useState(false);

  useEffect(async ()=>{
    ws = await conn();
    ws.on('progress', getProgress);
  },[]);
  
  const conn = async () =>{
    console.log('connecting');
    return webSocket("http://127.0.0.1:4001");
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
      console.log(prediction);
      setResult(result => [...result, {'open':false, 'crop':src_prefix+message['crop_image'], 'cam':src_prefix+message['cam_image'], 'prediction':prediction}])
      //setCrop(crop_image => [...crop_image, src_prefix+message['crop_image']]);
    }
    if (message['cam_image']){
      //setCam(cam_image => [...cam_image, src_prefix+message['cam_image']]);
    }
  }

  return(
    <div className="body_select">
      <h3>Total images {total}</h3>
      {total ? <ProgressBar animated now={100/total*progress} /> : 'waiting request...'}
      <h3>progress:{progress}/total:{total}</h3>
      { raw_image  && <img className='pic'src={raw_image} />}
      { yolo_image && <img className='pic'src={yolo_image}  />}
      { result && <h1>{result.length}</h1>}
      { result && result.map((item, index) => ( 
        <div key={index}>
          <img className='crop' src={item.crop} /> {"==>"} <img className='crop' src={item.cam} />
          <div>
            <Button
              onClick={() => {let newResult = [...result]; newResult[index].open = !item.open; setResult(newResult);}}
              aria-controls="example-collapse-text"
              aria-expanded={item.open}
            >
              click me
            </Button>
            <Collapse in={item.open}>
              <div id="example-collapse-text">
                {Object.keys(item.prediction).map((cate) => (
                  <h3> {cate} {"=>"} {item.prediction[cate]} </h3>
                ))}
              </div>
            </Collapse>
          </div>
        </div>
        ))}
      {/* <button onClick={lis}>testing</button> */}
      {/* <button onClick={}>start</button> */}
    </div>

  )
}

export default Analyze;
