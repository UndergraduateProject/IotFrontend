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
import useFitText from "use-fit-text";
import select_cabbage from "../../images/select_cabbage.png";


const ColorHelper = require('color-to-name');


// register lottie and define custom element
defineLordIconElement(loadAnimation);

// socket
const endpoint = "http://140.117.71.98:4001"
const socket = socketIOClient(endpoint);
const username = localStorage.getItem('username');

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


function Control() {
  //icon animation initialize
  const [spin, setSpin] = useState();
  const [loop, setLoop] = useState({
    msg : "loop",
    isActive : true,
  })
  const [plant, setPlant] = useState()
  const [fanhistory, setFanHistory] = useState([]);
  const [water, setWater] = useState("");
  const [waterhistory, setWaterHistory] = useState([]);
  const [volume, setVolume] = useState(100) ;
  const [duration, setDuration] = useState();
  const [color, setColor] = useState();
  const [selected, setSelected] = useState({
    "30秒" : false,
    "5分鐘" : false,
    "10分鐘" : false,
    "30分鐘" : false,
    "1小時" : false,
    "6小時" : false,
    "12小時" : false,
    "24小時" : false,
  })
  const [lightOnOff, setOnOff] = useState(true);
  const [chosenColor, setChosen] = useState();
  const [lightColor, setLightColor] = useState({});
  const [lastColor, setLastColor] = useState()
  const { fontSize, ref} = useFitText({
    maxFontSize:150,
  });
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
    setChosen(color)
    setLastColor(color)
  }

  const changeColor = () =>{
    const rgb = hexToRgb(chosenColor)
    const data = {
      "red":rgb[0],
      "green":rgb[1],
      "blue":rgb[2],
      "brightness":"100",
      "switch":"ON",
      "controller":username,
    }
    setColor(ColorHelper.findClosestColor(chosenColor).name)
    socket.emit("light",data)
    const url = "api/LED/";
    api.post(url,data)
    .then(res=>{
      console.log(res);
    })
  }

  //fan icon animate
  const toSpin = () => {
    setSpin(!spin);
    const data = {
      "switch" : !spin? "ON" : "OFF",
      "controller" : username, 
    }
    const url = "api/Fan/";
    const condition = "api/ActionCondition/3/"
    api.post(url, data)
    .then(res=>{
      console.log(res);
    })
    api.patch(condition, {"status" : "OFF"})
    socket.emit("fan",!spin? "ON" : "OFF")

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
    const condition = "api/ActionCondition/1/";
    const condition2 = "api/ActionCondition/2/"
    api.post(url, data)
    .then(res=>{
      console.log(res)
    })
    api.patch(condition, {"status" : "OFF"})
    .then(res => {
      console.log(res)
    })
    api.patch(condition2, {"status" : "OFF"})
    .then(res => {
      console.log(res)
    })
    setWater("loop")
    setVolume(0)
    setTimeout(()=> {
      setWater("");
    },4000);
    const instruction = {
      "status" : "on",
      "volume" : volume,
    };
    socket.emit("water",instruction)
  };


  //light on
  const openLight = () => {
    setOnOff(!lightOnOff);
    if(!lightOnOff){
      setChosen("#000000")
    }
    else{
      setChosen(lastColor)
    }
  };

  //camera icon loop
  const active = () => {
    loop.isActive ? setLoop({msg:"", isActive:!loop.isActive}) : setLoop({msg:"loop",isActive:!loop.isActive});
  };

  //duration
  const changeduration = (duration) => {
    setSelected({
      "30秒" : "30秒"==duration ? true : false,
      "5分鐘" : "5分鐘"==duration ? true : false,
      "10分鐘" : "10分鐘"==duration ? true : false,
      "30分鐘" : "30分鐘"==duration ? true : false,
      "1小時" : "1小時"==duration ? true : false,
      "6小時" : "6小時"==duration ? true : false,
      "12小時" : "12小時"==duration ? true : false,
      "24小時" : "24小時"==duration ? true : false,
    })
  };

  const confirmduration = () => {
    Object.keys(selected).forEach((key)=>{
      if(selected[key]){
        setDuration(key);
        const url = "api/Sensor/sensor1/";
        var data = {
          "name" : "sensor1",
          "interval" : "",
        }
        switch(key){
          case "30秒":
            data.interval = "00:00:30"
            break;

          case "5分鐘":
            data.interval = "00:05:00"
            break;

          case "10分鐘":
            data.interval = "00:10:00"
            break;

          case "30分鐘":
            data.interval = "00:30:00"
            break;

          case "1小時":
            data.interval = "01:00:00"
            break;

          case "6小時":
            data.interval = "06:00:00"
            break;

          case "12小時":
            data.interval = "12:00:00"
            break;

          case "24小時":
            data.interval = "24:00:00"
            break;

          default:
            data.interval="00:00:30";
        }
        api.patch(url,data)
        .then(res =>{
          console.log(res)
        })
      }
    })
    
  };

  //get data
  //plant
  useEffect(()=>{
    const url = "api/Usertoplant/";
    api.get(url)
    .then(res => {
      console.log(res['results']);
      const url = "api/Plant/"+ res['results'][0].plant + "/"
      api.get(url)
      .then(res =>{
        console.log(res)
        setPlant(res)
      })
    })
  },[])

  //fan
  useEffect(()=>{
    var url = "api/Fan/";
    api.get(url)
    .then(res => {
      var offset = (Math.floor(res.count/10))*10;
      var offseturl = url + "?offset=" + offset;
      api.get(offseturl)
      .then(res=>{
        if(res.results.length){
          const status = res.results[res.results.length-1].switch;
          if(status == "ON"){
            setSpin(true)
          }
          else{
            setSpin(false)
          }
          setFanHistory(res.results.reverse())
        }
        else{
          offset -= 10;
          var newurl = url + "?offset=" + offset;
          api.get(newurl)
          .then(res=>{
            const status = res.results[res.results.length-1].switch;
            if(status == "ON"){
              setSpin(true)
            }
            else{
              setSpin(false)
            }
            setFanHistory(res.results.reverse())
          })
        }
      })
    })
  },[spin])

  const fantemplate = fanhistory.map(ele => {
    return (<li key={ele.id}><div  className="history"><div>{ele.timestamp}</div> <div>{ele.switch}</div></div></li>)
  });
  //fan

  //water
  useEffect(()=>{
    var url = "api/Wartering/";
    api.get(url)
    .then(res => {
      var offset = (Math.floor(res.count/10))*10;
      var offseturl = url + "?offset=" + offset;
      api.get(offseturl)
      .then(res=>{
        if(res.results.length){
          setWaterHistory(res.results.reverse())
        }
        else{
          offset -= 10;
          var newurl = url + "?offset=" + offset;
          api.get(newurl)
          .then(res=>{
            setWaterHistory(res.results.reverse())
          })
        }
      })
    })
  },[])

  const watertemplate = waterhistory.map(ele => {
    return(<li key={ele.id}><div  className="history"><div>{ele.timestamp}</div> <div>{ele.volume}ml</div></div></li>)
  })
  //water

  //LED
  function getColor(results){
    const red = results[0].red;
    const green = results[0].green;
    const blue = results[0].blue;
    const brightness = results[0].brigthness
    const switchs = results[0].switch
    setLightColor({
      "R": red,
      "G": green,
      "B": blue,
      "brightness":brightness,
      "switch":switchs,
      })
    const hex = rgbToHex(red,green,blue)
    setColor(ColorHelper.findClosestColor(hex).name)
  }

  useEffect(()=>{
    var url = "api/LED/";
    api.get(url)
    .then(res=>{
      var offset = (Math.floor(res.count/10))*10;
      var offseturl = url + "?offset=" + offset;
      api.get(offseturl)
      .then(res=>{
        if(res.results.length){
          res.results = res.results.reverse()
          getColor(res.results)
        }
        else{
          offset -= 10;
          var newurl = url + "?offset=" + offset;
          api.get(newurl)
          .then(res=>{
            res.results = res.results.reverse()
            getColor(res.results)
          })
        }
      })
    })
  },[])
  //LED

  //interval
  useEffect(()=>{
    const url = "api/Sensor/sensor1/"
    api.get(url)
    .then(res=>{
      switch(res.interval){
        case "00:00:30":
          setDuration("30秒")
          setSelected({
            ...selected,
            "30秒":true
          })
          break;

        case "00:05:00":
          setDuration("5分鐘")
          setSelected({
            ...selected,
            "5分鐘":true
          })
          break;

        case "00:10:00":
          setDuration("10分鐘")
          setSelected({
            ...selected,
            "10分鐘":true
          })
          break;

        case "00:30:00":
          setDuration("30分鐘")
          setSelected({
            ...selected,
            "30分鐘":true
          })
          break;

        case "01:00:00":
          setDuration("1小時")
          setSelected({
            ...selected,
            "1小時":true
          })
          break;

        case "06:00:00":
          setDuration("6小時")
          setSelected({
            ...selected,
            "6小時":true
          })
          break;

        case "12:00:00":
          setDuration("12小時")
          setSelected({
            ...selected,
            "12小時":true
          })
          break;

        case "24:00:00":
          setDuration("24小時")
          setSelected({
            ...selected,
            "24小時":true
          })
          break;

        default:
          setDuration("30分鐘")
          setSelected({
            ...selected,
            "30分鐘":true
          })
      }
    })
  },[])

  //interval

  return (
    <div className="home">
      <Container fluid className="control-container">
      <Sidebar />
      <Row>
        <Col className="img"><img className="house" src={control_greenHouse} alt=""/></Col>
      </Row>

      <div className="control_plant">
      <img  className="control_plant_pic" src={plant? plant.image :""} alt="plant"/>
      {/* <img  style={{width:'90px' , height:'70px',paddingLeft:'20px',paddingTop:'10px'}}
        src={select_cabbage}/> */}
        <div className="control_plant_name">{plant ? plant.name : ""}</div>
        <div className="control_plant_detail">{plant ? plant.description : ""}</div>
      </div>

{/* 
      <Row >
        <Col className="catalogue">Control</Col>
      </Row> */}

      <Row className="control-square">
        <Popup 
        trigger=
        {<Col >
          <div className="fan">{fanIcon}</div>
          <div className="data">{spin?"開啟":"關閉"}</div>
          <div>風扇</div>
        </Col>} modal>
          {
            close => (
              <div className="modal">
                <div >
                  <button className="close" onClick={close}>
                    &times;
                  </button>
              <div className="modal-fan">{fanIcon}</div>
              <div className="data">{spin?"開啟":"關閉"}</div>
              <div>風扇</div>
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
          <div>水量</div>
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
                      <Button variant="primary" onClick={watering}>澆水</Button>
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
          <div className="data" ref={ref} style={{fontSize,height: 42, width: 80,paddingTop:5,paddingLeft:-5}}>{color}</div>
          <div>燈控</div>
        </Col>} modal>
          {
            close => (
              <div className="modal">
                <button className="close" onClick={close}>&times;</button>
                <CircularColor centerRect={true} onChange={handleColorChange}/>
                  <div>燈控</div>
                  <label className="switch">
                    <input type="checkbox" onClick={openLight} checked={lightOnOff}/>
                    <span className="slider"></span>
                  </label>
                  <Button variant="primary" onClick={changeColor}>Confirm</Button>
              </div>
            )
          }
        </Popup>
      </Row>

      <Row className="control-rectangle">
        <Popup trigger={<Col>
          <div ><img src={clock} alt=""/></div>
          <div className="data">{duration}</div>
          <div className="sub">搜尋間隔</div>
        </Col>} modal>
        {
          close => (
            <div className="modal">
              <button className="close" onClick={()=>{close(); changeduration(duration)}}>
                &times;
              </button>
              <div id="duration" >
                <div className={selected['30秒'] ? "selected" : null} onClick={()=>changeduration("30秒")}>30秒</div>
                <div className={selected['5分鐘'] ? "selected" : null} onClick={()=>changeduration("5分鐘")}>5分鐘</div>
                <div className={selected['10分鐘'] ? "selected" : null} onClick={()=>changeduration("10分鐘")}>10分鐘</div>
                <div className={selected['30分鐘'] ? "selected" : null} onClick={()=>changeduration("30分鐘")}>30分鐘</div>
                <div className={selected['1小時'] ? "selected" : null} onClick={()=>changeduration("1小時")}>1小時</div>
                <div className={selected['6小時'] ? "selected" : null} onClick={()=>changeduration("6小時")}>6小時</div>
                <div className={selected['12小時'] ? "selected" : null} onClick={()=>changeduration("12小時")}>12小時</div>
                <div className={selected['24小時'] ? "selected" : null} onClick={()=>changeduration("24小時")}>24小時</div>
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
              <div className="data">相機</div>
              <div className="sub">運作中</div>
            </Link>
          </Col>
      </Row>
      <div id="popup-root" />
    </Container>
    </div>
  )
}

export default Control;
