import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
import "./forgetPw2.css";
import logo from "./logo.png";



function forgetPw2() {
  return (
    <div class="forgetPw2_body">
      <Container>
        <Row>
          <Col className="forgetPw2_top1" md={{ span: 6, offset: 3 }} sm={{ span: 6, offset: 3 }} xs={{ span: 6, offset: 3 }}>
            <img className="forgetPw2_logo" src={ logo }/></Col>
        </Row>

        <Row>
          <Col className="forgetPw2_top2" md={{span: 10, offset: 1}} sm={{ span: 10, offset: 1 }} xs={12}>
          We have sent a verification code to your Email!
          </Col>
        </Row>
    
        <div className="forgetPw2_top4"><input placeholder="Enter verification code"></input></div>
      
        <Row >
          <Col className="forgetPw2_top5" md={{ span: 4, offset: 4 }} sm={{ span: 4, offset: 4 }} xs={{ span: 4, offset: 4 }}>
          <Button className="btn" size="sm" variant="secondary" >Submit</Button>{' '}</Col>
        </Row>

        <Row>
          <Col className="forgetPw2_top3" md={12} sm={12} xs={12}> Didn’t receive verification code?   
            <a className="forgetPw2_top3" herf="#"> Click me </a>    
          </Col>
        </Row>

      </Container>
    </div>
  )
}

export default forgetPw2;
