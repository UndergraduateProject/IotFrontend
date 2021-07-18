import React, {useState, useRef, useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "./control.css";
import control_greenHouse from '../../images/control_greenHouse.png';
import {Container, Row, Col, Button} from 'react-bootstrap';
import Sidebar from '../../component/Sidebar';
import clock from '../../images/clock.png';
import Slider from "@material-ui/core/Slider";

function Control() {
  //icon animation initialize
  const [spin, setSpin] = useState(true);
  const [spinstyle, setStyle] = useState("fas fa-fan fa-lg fa-spin")
  const [loop, setLoop] = useState({
    msg : "loop",
    isActive : true,
  })
  const [water, setWater] = useState("");
  const [duration, setDuration] = useState("30mins");
  //get element reference
  var light = useRef(null);
  var slider = useRef(null);

  var [volume, setVolume] = useState(100) ;



  //fan icon animate
  const toSpin = () => {
    const state = !spin;
    setSpin(!spin);
    state ? setStyle("fas fa-fan fa-lg fa-spin") : setStyle("fas fa-fan fa-lg");
  }

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
    },4000)
  }


  //simulate click on light when click on Col
  const openLight = () => {
    light.click();
  }

  //camera icon loop
  const active = () => {
    loop.isActive ? setLoop({msg:"", isActive:!loop.isActive}) : setLoop({msg:"loop",isActive:!loop.isActive});
  }

  //duration
  const changeduration = (e) => {
    console.log(e)
    setDuration(e.target.value)
  }


  return (
    <div className="home">
      <Container fluid className="control-container">
      <Sidebar />
      <Row>
        <Col className="img"><img className="house" src={control_greenHouse} alt=""/></Col>
      </Row>
      <Row >
        <Col className="catalogue">Catalogue</Col>
      </Row>
      <Row className="control-square">
        <Popup 
        trigger=
        {<Col >
          <div className="fan"><i class={spinstyle}></i></div>
          <div className="data">30%</div>
          <div>Fan</div>
        </Col>} modal>
          <div >
            <div className="fan"><i class={spinstyle}></i></div>
            <div className="data">30%</div>
            <div>Fan</div>
          </div>
          <label class="switch">
            <input type="checkbox"  onChange={toSpin} checked={spin}/>
            <span class="slider"></span>
          </label>
        </Popup>
        
        <Popup trigger={<Col>
          <lord-icon src="https://cdn.lordicon.com/oyclgnwc.json" trigger="click" target="div" colors="primary:#9cf4df,secondary:#d1fad7"></lord-icon>
          <div className="data">{volume + "ml"}</div>
          <div>Capacity</div>
        </Col>} modal>
            <lord-icon src="https://cdn.lordicon.com/oyclgnwc.json" trigger={water} target="div" colors="primary:#9cf4df,secondary:#d1fad7" ></lord-icon>
            <div className="data water-data">{volume + "ml"}</div>
            <form >
              <Slider min={0} max={250} step={1} value={volume} valueLabelDisplay="auto" onChange={slide} ref={ref => slider = ref}/>
              <Button variant="primary" onClick={watering}>Water</Button>
            </form>
        </Popup>
        
        <Popup trigger={<Col onClick={openLight}>
          <div className='titanic titanic-idea' ref={lightref => light = lightref}></div>
          <div className="data">40%</div>
          <div>Light</div>
        </Col>} modal>
          <div className='titanic titanic-idea' ref={lightref => light = lightref}></div>
          <div className="data">40%</div>
          <div>Light</div>
        </Popup>
      </Row>
      <Row className="control-rectangle">
        <Popup trigger={<Col>
          <div ><img src={clock} alt=""/></div>
          <div className="data">{duration}</div>
          <div className="sub">Duration</div>
        </Col>} modal>
        <form >
        <select name="duration" onClick={changeduration}>
        <option>5mins</option>
            <option>10mins</option>
            <option selected="selected">30mins</option>
            <option>1hour</option>
            <option>6hour</option>
            <option>12hour</option>
            <option>24hour</option>
        </select>
        </form>
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
