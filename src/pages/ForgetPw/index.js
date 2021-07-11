import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
import "./forgetPw.css";
import logo from "../../images/logo.png";



function forgetPw() {
  return (
    <div class="forgetPw_body">
    <Container >
      <Row>
        <Col  className="forgetPw_top1" md={{ span: 6, offset: 3 }} sm={{ span: 6, offset: 3 }} xs={{ span: 6, offset: 3 }}>
          <img className="forgetPw_logo" src={ logo }/></Col>
      </Row>

      <Row>
        <Col className="forgetPw_top2" md={{ span: 10, offset: 1 }} sm={{ span: 10, offset: 1 }} xs={{ span: 10, offset: 1 }}>
          Find Your Account
        </Col>
      </Row>
      
      <Row>
        <Col className="forgetPw_top3" md={{span: 8, offset: 2}} sm={{span: 10, offset: 1}} xs={{span: 8, offset: 2}}>
          Enter the email associated with your account.
        </Col>
      </Row>

      <div className="forgetPw_top4"><input placeholder="Enter your Email"></input></div>
     
      <Row >
        <Col  className="forgetPw_top5" md={{ span: 4, offset: 4 }} sm={{ span: 4, offset: 4 }} xs={{ span: 4, offset: 4 }}>
        <Button size="sm" variant="secondary" className="forgetPw_btn">Submit</Button>{' '}</Col>
      </Row>

    </Container>
    </div>
  )
}

export default forgetPw;
