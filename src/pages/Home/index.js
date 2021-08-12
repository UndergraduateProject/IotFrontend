import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
import "./homepage.css";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import Sidebar from '../../component/Sidebar';
import moment from "moment"



function homepage() {
  return (
    <div className="home">
    <Container >
      <Row><Sidebar></Sidebar></Row>
      <Row>
        <Col  className="home_top1" md={{ span: 6, offset: 3 }} sm={{ span: 6, offset: 3 }} xs={{ span: 6, offset: 3 }}>
          <img className="home_pic" src={ logo } alt=""/></Col>
      </Row>
      
      <Row >
        <Col className="home_top2" md={{ span: 4, offset: 4 }} sm={{ span: 4, offset: 4 }} xs={{ span: 4, offset: 4 }}>
        <Link to="/select"><Button size="lg" variant="light" className="home_btn">選擇植物</Button>{' '}</Link>
        </Col>
      </Row>

      <Row >
        <Col className="home_top2" md={{ span: 4, offset: 4 }} sm={{ span: 4, offset: 4 }} xs={{ span: 4, offset: 4 }}>
        <Link to="/monitor"><Button size="lg" variant="light" className="home_btn">監控數據</Button>{' '}</Link>
        </Col>
      </Row>

      <Row >
        <Col className="home_top2" md={{ span: 4, offset: 4 }} sm={{ span: 4, offset: 4 }} xs={{ span: 4, offset: 4 }}>
        <Link to="/control"><Button size="lg" variant="light" className="home_btn">調控物件</Button>{' '}</Link>
        </Col>
      </Row>

      <Row >
        <Col className="home_top2" md={{ span: 4, offset: 4 }} sm={{ span: 4, offset: 4 }} xs={{ span: 4, offset: 4 }}>
        <Link to="/visualization"><Button size="lg" variant="light" className="home_btn">分析結果</Button>{' '}</Link>
        </Col>
      </Row>

    </Container>
    </div>
  )
}

export default homepage;
