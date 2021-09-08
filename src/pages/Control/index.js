import React, {useState, useRef, useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "./control.css";
import control_greenHouse from '../../images/control_greenHouse.png';
import {Container, Row, Col, Button} from 'react-bootstrap';
import Sidebar from '../../component/Sidebar';
import clock from '../../images/clock.png';
import Slider from "@material-ui/core/Slider";
import CircularColor from 'react-circular-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFan} from '@fortawesome/free-solid-svg-icons'
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import { Link } from "react-router-dom"
import api from "../../utils/api"
import socketIOClient from "socket.io-client";

const ColorHelper = require('color-to-name');


// register lottie and define custom element
defineLordIconElement(loadAnimation);

// socket
const endpoint = "http://140.117.71.98:4001"
const socket = socketIOClient(endpoint);
const username = localStorage.getItem('username');

function Control() {
  //icon animation initialize
  const [spin, setSpin] = useState();
  const [loop, setLoop] = useState({
    msg : "loop",
    isActive : true,
  })
  const [fanhistory, setFanHistory] = useState([]);
  const [water, setWater] = useState("");
  const [waterhistory, setWaterHistory] = useState([]);
  const [volume, setVolume] = useState(100) ;
  const [duration, setDuration] = useState("30mins");
  const [color, setColor] = useState("Green");
  const [selected, setSelected] = useState({
    "5mins" : false,
    "10mins" : false,
    "30mins" : true,
    "1hour" : false,
    "6hour" : false,
    "12hour" : false,
    "24hour" : false,
  })
  const [lightOnOff, setOnOff] = useState(true);
  //get element reference
  var light = useRef(null);
  var slider = useRef(null);


  //RGB value
  const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

  
  const handleColorChange = (color) =>{
    const rgb = hexToRgb(color)
    console.log(ColorHelper.findClosestColor(color))
    setColor(ColorHelper.findClosestColor(color).name)
    socket.emit("light",{"R":rgb[0], "G":rgb[1],"B":rgb[2], "Brightness":"100",})
    console.log(hexToRgb(color))
  }

  //fan icon animate
  const toSpin = () => {
    setSpin(!spin);
    const data = {
      "switch" : !spin? "ON" : "OFF",
      "controller" : username, 
    }
    const url = "api/Fan/";
    api.post(url, data)
    .then(res=>{
      console.log(res);
    })
  }
  const fanIcon =  spin ? <FontAwesomeIcon icon={faFan} size="lg" spin/> : <FontAwesomeIcon icon={faFan} size="lg" />

  //slide volume 
  const slide = (e,value) => {
    setVolume(value);
  }

  //water animation
  // setState does not change value right after called
  const watering = () => {
    const data = {
      "volume" : volume,
      "controller" : username,
    };
    const url = "api/Wartering/";
    api.post(url, data)
    .then(res=>{
      console.log(res)
    })
    setWater("loop")
    setVolume(0)
    setTimeout(()=> {
      setWater("");
    },4000);
    socket.emit("water","on")
  };


  //light on
  const openLight = () => {
    setOnOff(!lightOnOff);
  };

  //camera icon loop
  const active = () => {
    loop.isActive ? setLoop({msg:"", isActive:!loop.isActive}) : setLoop({msg:"loop",isActive:!loop.isActive});
  };

  //duration
  const changeduration = (duration) => {
    setSelected({
      "5mins" : "5mins"==duration ? true : false,
      "10mins" : "10mins"==duration ? true : false,
      "30mins" : "30mins"==duration ? true : false,
      "1hour" : "1hour"==duration ? true : false,
      "6hour" : "6hour"==duration ? true : false,
      "12hour" : "12hour"==duration ? true : false,
      "24hour" : "24hour"==duration ? true : false,
    })
  };

  const confirmduration = () => {
    Object.keys(selected).forEach((key)=>{
      if(selected[key]){
        setDuration(key);
      }
    })
  };

  //get data
  //fan
  useEffect(()=>{
    var url = "api/Fan/";
    api.get(url)
    .then(res => {
      const offset = (Math.floor(res.count/10))*10;
      url = url + "?offset=" + offset;
      api.get(url)
      .then(res=>{
        const status = res.results[res.results.length-1].switch;
        if(status == "ON"){
          setSpin(true)
        }
        else{
          setSpin(false)
        }
        setFanHistory(res.results)
        console.log(res.results)
      })
    })
  },[])

  const fantemplate = fanhistory.map(ele => {
    return (<li key={ele.id}><div  className="history"><div>{ele.timestamp}</div> <div>{ele.switch}</div></div></li>)
  });
  //fan

  //water
  useEffect(()=>{
    var url = "api/Wartering/";
    api.get(url)
    .then(res => {
      const offset = (Math.floor(res.count/10))*10;
      url = url + "?offset=" + offset;
      api.get(url)
      .then(res=>{
        console.log(res)
        setWaterHistory(res.results)
      })
    })
  },[])

  const watertemplate = waterhistory.map(ele => {
    return(<li key={ele.id}><div  className="history"><div>{ele.timestamp}</div> <div>{ele.volume}ml</div></div></li>)
  })
  //water

  return (
    <div className="home">
      <Container fluid className="control-container">
      <Sidebar />
      <Row>
        <Col className="img"><img className="house" src={control_greenHouse} alt=""/></Col>
      </Row>
      <Row >
        <Col className="catalogue">Control</Col>
      </Row>
      <Row className="control-square">
        <Popup 
        trigger=
        {<Col >
          <div className="fan">{fanIcon}</div>
          <div className="data">30%</div>
          <div>Fan</div>
        </Col>} modal>
          {
            close => (
              <div className="modal">
                <div >
                  <button className="close" onClick={close}>
                    &times;
                  </button>
              <div className="modal-fan">{fanIcon}</div>
              <div className="data">30%</div>
              <div>Fan</div>
              </div>
                <label className="switch">
                  <input type="checkbox"  onChange={toSpin} checked={spin}/>
                  <span className="slider"></span>
                </label>
                <ul id="recent">
                    {fantemplate}
                </ul>
              </div>
            )
          }
        </Popup>
        
        <Popup trigger={<Col>
          <lord-icon src="https://cdn.lordicon.com/oyclgnwc.json" trigger="click" target="div" colors="primary:#9cf4df,secondary:#d1fad7"></lord-icon>
          <div className="data">{volume + "ml"}</div>
          <div>Capacity</div>
        </Col>} modal>
            {
              close => (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <lord-icon  src="https://cdn.lordicon.com/oyclgnwc.json" trigger={water} target="div" colors="primary:#9cf4df,secondary:#d1fad7" ></lord-icon>
                    <div div className="data water-data">{volume + "ml"}</div>
                    <form >
                      <Slider min={0} max={250} step={1} value={volume} valueLabelDisplay="auto" onChange={slide} ref={ref => slider = ref}/>
                      <Button variant="primary" onClick={watering}>Water</Button>
                    </form>
                    <ul id="recent">
                      {watertemplate}
                    </ul>
                </div>
              )
            }
        </Popup>
        
        <Popup trigger={<Col >
          <img src="https://img.icons8.com/ios/50/000000/idea--v2.png"/>
          <div className="data">{color}</div>
          <div>Light</div>
        </Col>} modal>
          {
            close => (
              <div className="modal">
                <button className="close" onClick={close}>&times;</button>
                <CircularColor centerRect={true} onChange={handleColorChange}/>
                  <div>Light</div>
                  <label className="switch">
                    <input type="checkbox" onClick={openLight} checked={lightOnOff}/>
                    <span className="slider"></span>
                  </label>
              </div>
            )
          }
        </Popup>
      </Row>
      <Row className="control-rectangle">
        <Popup trigger={<Col>
          <div ><img src={clock} alt=""/></div>
          <div className="data">{duration}</div>
          <div className="sub">Duration</div>
        </Col>} modal>
        {
          close => (
            <div className="modal">
              <button className="close" onClick={()=>{close(); changeduration(duration)}}>
                &times;
              </button>
              <div id="duration" >
                <div className={selected['5mins'] ? "selected" : null} onClick={()=>changeduration("5mins")}>5mins</div>
                <div className={selected['10mins'] ? "selected" : null} onClick={()=>changeduration("10mins")}>10mins</div>
                <div className={selected['30mins'] ? "selected" : null} onClick={()=>changeduration("30mins")}>30mins</div>
                <div className={selected['1hour'] ? "selected" : null} onClick={()=>changeduration("1hour")}>1hour</div>
                <div className={selected['6hour'] ? "selected" : null} onClick={()=>changeduration("6hour")}>6hour</div>
                <div className={selected['12hour'] ? "selected" : null} onClick={()=>changeduration("12hour")}>12hour</div>
                <div className={selected['24hour'] ? "selected" : null} onClick={()=>changeduration("24hour")}>24hour</div>
              </div>
              <button className="confirm-btn" onClick={()=> {confirmduration(); close();}}>confirm</button>
            </div>
          )
        }
        </Popup>
          <Col>
            <Link to="/camera">
              <lord-icon src="https://cdn.lordicon.com/vixtkkbk.json" trigger={loop.msg} colors="primary:#121331,secondary:#08a88a">
              </lord-icon>
              <div className="data">Camera</div>
              <div className="sub">Active</div>
            </Link>
          </Col>
      </Row>
      <Row>
        <button className="power-btn">Power On</button>
      </Row>
      <div id="popup-root" />
    </Container>
    </div>
  )
}

export default Control;
