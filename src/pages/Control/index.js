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

// register lottie and define custom element
defineLordIconElement(loadAnimation);

function Control() {
  //icon animation initialize
  const [spin, setSpin] = useState(true);
  const [loop, setLoop] = useState({
    msg : "loop",
    isActive : true,
  })
  const [water, setWater] = useState("");
  const [duration, setDuration] = useState("30mins");
  const [lightOnOff, setOnOff] = useState(true);
  //get element reference
  var light = useRef(null);
  var slider = useRef(null);

  var [volume, setVolume] = useState(100) ;

  //RGB value
  const handleColorChange = (color) =>{
    console.log(color)
  }

  //fan icon animate
  const toSpin = () => {
    const state = !spin;
    setSpin(!spin);
  }
  const fanIcon =  spin ? <FontAwesomeIcon icon={faFan} size="lg" spin/> : <FontAwesomeIcon icon={faFan} size="lg" />

  //slide volume 
  const slide = (e,value) => {
    setVolume(value);
  }

  //water animation
  // setState does not change value right after called
  const watering = () => {
    setWater("loop")
    setVolume(0)
    setTimeout(()=> {
      setWater("");
    },4000);
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
    setDuration(duration)
  };

  



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
                    <li><div  className="history"><div>2021.06.25 17:25</div> <div>250ml</div></div></li>
                    <li><div  className="history"><div>2021.06.25 17:25</div> <div>250ml</div></div></li>
                    <li><div  className="history"><div>2021.06.25 17:25</div> <div>250ml</div></div></li>
                    <li><div  className="history"><div>2021.06.25 17:25</div> <div>250ml</div></div></li>
                    <li><div  className="history"><div>2021.06.25 17:25</div> <div>250ml</div></div></li>
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
                      <li><div  className="history"><div>2021.06.25 17:25</div> <div>250ml</div></div></li>
                      <li><div  className="history"><div>2021.06.25 17:25</div> <div>250ml</div></div></li>
                      <li><div  className="history"><div>2021.06.25 17:25</div> <div>250ml</div></div></li>
                      <li><div  className="history"><div>2021.06.25 17:25</div> <div>250ml</div></div></li>
                      <li><div  className="history"><div>2021.06.25 17:25</div> <div>250ml</div></div></li>
                    </ul>
                </div>
              )
            }
        </Popup>
        
        <Popup trigger={<Col >
          <div className='titanic titanic-idea' ref={lightref => light = lightref}></div>
          <div className="data">40%</div>
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
              <button className="close" onClick={close}>
                &times;
              </button>
              <div id="duration" >
                <div tabindex="1" onClick={()=>changeduration("5mins")}>5mins</div>
                <div tabindex="2" onClick={()=>changeduration("10mins")}>10mins</div>
                <div tabindex="3" onClick={()=>changeduration("30mins")}>30mins</div>
                <div tabindex="4" onClick={()=>changeduration("1hour")}>1hour</div>
                <div tabindex="5" onClick={()=>changeduration("6hour")}>6hour</div>
                <div tabindex="6" onClick={()=>changeduration("12hour")}>12hour</div>
                <div tabindex="7" onClick={()=>changeduration("24hour")}>24hour</div>
              </div>
            </div>
          )
        }
        </Popup>
        <Popup trigger={<Col>
          <lord-icon src="https://cdn.lordicon.com/vixtkkbk.json" trigger={loop.msg} colors="primary:#121331,secondary:#08a88a">
          </lord-icon>
          <div className="data">Camera</div>
          <div className="sub">Active</div>
        </Col>} modal></Popup>
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
