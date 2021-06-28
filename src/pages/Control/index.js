import React from 'react';
import "./control.css";
import control_greenHouse from './control_greenHouse.png';
import control_battery from './control_battery.png';
import control_capacity from './control_capacity.png';
import control_light from './control_light.png';
import control_duration from './control_duration.png';
import control_close from './control_close.png';
import {Container, Row, Col} from 'react-bootstrap';
import Sidebar from '../../component/Sidebar'



function Control() {
  return (
    <Container fluid className="control-container">
      <Row><Sidebar /></Row>
      <Row>
        <Col className="img"><img className="house" src={control_greenHouse}/></Col>
        <Col className="change-btn">Change</Col>
      </Row>
      <Row >
        <Col className="catalogue">Catalogue</Col>
      </Row>
      <Row className="control-square">
        <Col>
          <div></div>
          <div className="data">30%</div>
          <div>Battery</div>
        </Col>
        <Col>
          <div></div>
          <div className="data">750ml</div>
          <div>Capacity</div>
        </Col>
        <Col>
          <div></div>
          <div className="data">40%</div>
          <div>Light</div>
        </Col>
      </Row>
      <Row className="control-rectangle">
        <Col>
          <div></div>
          <div className="data">30Min</div>
          <div>Duration</div>
        </Col>
        <Col>
          <div></div>
          <div className="data">Open</div>
          <div>Close</div>
        </Col>
      </Row>
      <Row>
        <button className="control_button2">Power On</button>
      </Row>
    </Container>
  )
}

export default Control;
