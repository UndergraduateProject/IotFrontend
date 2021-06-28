import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
import "./forgetPw3.css";
import logo from "./logo.png";



function forgetPw3() {
  return (
    <div class="forgetPw3_body">
      <Container>
        <Row>
          <Col className="forgetPw3_top1" md={{ span: 6, offset: 3 }} sm={{ span: 6, offset: 3 }} xs={{ span: 6, offset: 3 }}>
            <img className="forgetPw3_logo" src={ logo }/></Col>
        </Row>

        <Row>
          <Col className="forgetPw3_top2" md={{span: 10, offset: 1}} sm={{ span: 10, offset: 1 }} xs={12}>
            Change Password
          </Col>
        </Row>
    
        <div className="forgetPw3_top4"><input placeholder="Enter new password"></input></div>
        <div className="forgetPw3_top6"><input placeholder="Confirm new password"></input></div>

        <Row >
          <Col className="forgetPw3_top5" md={{ span: 4, offset: 4 }} sm={{ span: 4, offset: 4 }} xs={{ span: 4, offset: 4 }}>
          <Button className="btn" size="sm" variant="secondary" >Submit</Button>{' '}</Col>
        </Row>

      </Container>
    </div>
  )
}

export default forgetPw3;
