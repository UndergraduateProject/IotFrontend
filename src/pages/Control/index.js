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
      <Sidebar />
      <Row>
        {/* <div><img className="house" src={control_greenHouse}/></div> */}
        <div className="change-btn">Change</div>
      </Row>

    </Container>
  )
}

export default Control;
