import React from 'react';
import "./control.css";
import control_greenHouse from '../../images/control_greenHouse.png';
import control_battery from '../../images/control_battery.png';
import control_capacity from '../../images/control_capacity.png';
import control_light from '../../images/control_light.png';
import control_duration from '../../images/control_duration.png';
import control_close from '../../images/control_close.png';
import {Container, Row, Col} from 'react-bootstrap';
import Sidebar from '../../component/Sidebar';
import fan from '../../images/fan.png';
import water from '../../images/water.png';
import light from '../../images/light.png';
import clock from '../../images/clock.png';
import door from '../../images/door.png';



function Control() {
  return (
    <Container fluid className="control-container">
      <Sidebar />
      <Row>
        <Col className="img"><img className="house" src={control_greenHouse}/></Col>
      </Row>
      <Row>
        <Col className="change-btn">Change</Col>
      </Row>
      <Row >
        <Col className="catalogue">Catalogue</Col>
      </Row>
      <Row className="control-square">
        <Col>
          <div><img src={fan}/></div>
          <div className="data">30%</div>
          <div>Battery</div>
        </Col>
        <Col>
          <div><img src={water}/></div>
          <div className="data">750ml</div>
          <div>Capacity</div>
        </Col>
        <Col>
          <div><img src={light}/></div>
          <div className="data">40%</div>
          <div>Light</div>
        </Col>
      </Row>
      <Row className="control-rectangle">
        <Col>
          <div ><img src={clock}/></div>
          <div className="data">30Min</div>
          <div>Duration</div>
        </Col>
        <Col>
          <div><img src={door}/></div>
          <div className="data">Open</div>
          <div>Close</div>
        </Col>
      </Row>
      <Row>
        <button className="power-btn">Power On</button>
      </Row>
    </Container>
  )
}

export default Control;
