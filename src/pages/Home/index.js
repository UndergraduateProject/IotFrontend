import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
import "./homepage.css";
import logo from "./logo.png";
import homepage1 from "./homepage.png";
import journal from "./journal.png";
import Userstatus from "./Userstatus";


function homepage() {
  return (
    <div class="home">
    <Container fluid>
      <Userstatus />
      <Row>
        <Col className="top1"></Col>
        <Col  className="top1"><img style={{height:'80px',width:'140px'}} src={ logo }/></Col>
        <Col className="top1"></Col>
      </Row>

      <Row >
        <Col xs={{ span: 4, offset: 1 }}  className="top"> <img style={{width: '108px'}}class="homepage " src={homepage1}/></Col>
        <Col xs={{ span: 4, offset: 1 }}  className="top"> <img style={{width: '131px'}}class="homepage" src={journal}/></Col>
      </Row>
      
      <Row className="top">
        <Col></Col>
        <Col xs={7.5}><Button size="lg" variant="light" className="btn">選擇植物</Button>{' '}</Col>
        <Col></Col>
      </Row>

      <Row className="top">
        <Col></Col>
        <Col xs={7.5}><Button size="lg" variant="light" className="btn">監控</Button>{' '}</Col>
        <Col></Col>
      </Row>

      <Row className="top">
        <Col></Col>
        <Col  xs={7.5}><Button size="lg" variant="light" className="btn">調控物件</Button>{' '}</Col>
        <Col></Col>
      </Row>

      <Row className="top">
        <Col></Col>
        <Col  xs={7.5}><Button size="lg" variant="light" className="btn">分析結果</Button>{' '}</Col>
        <Col></Col>
      </Row>

    </Container>
    
    <div class="wrapper1">
      <div class="content1"></div>
        <div class="footer1 "></div>
      </div>
    </div>
   
  )
}

export default homepage;
