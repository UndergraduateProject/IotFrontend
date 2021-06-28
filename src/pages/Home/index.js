import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
import "./homepage.css";
import logo from "./logo.png";
import Userstatus from "./Userstatus";
import Sidebar from '../../component/Sidebar'



function homepage() {
  return (
    <div class="home">
    <Container >
    <Row><Sidebar /></Row>
      <Userstatus /> 
      <Row>
        <Col  className="home_top1" md={{ span: 6, offset: 3 }} sm={{ span: 6, offset: 3 }} xs={{ span: 6, offset: 3 }}>
          <img className="home_pic" src={ logo }/></Col>
      </Row>
      
      <Row >
        <Col className="home_top2" md={{ span: 4, offset: 4 }} sm={{ span: 4, offset: 4 }} xs={{ span: 4, offset: 4 }}>
        <Button size="lg" variant="light" className="home_btn">選擇植物</Button>{' '}</Col>
      </Row>

      <Row >
        <Col className="home_top2" md={{ span: 4, offset: 4 }} sm={{ span: 4, offset: 4 }} xs={{ span: 4, offset: 4 }}>
        <Button size="lg" variant="light" className="home_btn">監控數據</Button>{' '}</Col>
      </Row>

      <Row >
        <Col className="home_top2" md={{ span: 4, offset: 4 }} sm={{ span: 4, offset: 4 }} xs={{ span: 4, offset: 4 }}>
        <Button size="lg" variant="light" className="home_btn">調控物件</Button>{' '}</Col>
      </Row>

      <Row >
        <Col className="home_top2" md={{ span: 4, offset: 4 }} sm={{ span: 4, offset: 4 }} xs={{ span: 4, offset: 4 }}>
        <Button size="lg" variant="light" className="home_btn">分析結果</Button>{' '}</Col>
      </Row>

    </Container>
    </div>
  )
}

export default homepage;
