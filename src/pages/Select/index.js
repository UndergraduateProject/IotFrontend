import React, { useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col,Button} from 'react-bootstrap';
import "./select.css";
import select_potato from "../../images/select_potato.png";
import select_cabbage from "../../images/select_cabbage.png";
import select_tomato from "../../images/select_tomato.png";
import Sidebar from '../../component/Sidebar';
import api from "../../utils/api"

const path = "api/Plant/";

function Select() {
  const [plant, setPlant] =  useState([]);

  useEffect(()=>{
    api.get(path).then((res)=>{
      console.log(res["results"])
      setPlant(res["results"])
    })
  },[])

  const template = plant.map((item, index)=>{
    return(
      <Row key={index}>
        <Col  md={{ span: 10, offset: 1 }}  sm={{ span: 10, offset: 1 }} xs={{ span: 10, offset: 1 }}> 
        <div className="select_plant" >
      <Row>
        <Col md={6}  sm={6} xs={6}><img className="select_potato_pic" src={select_potato}/></Col>
      </Row>
      <Row>
        <Col className="select_title">{item.name}</Col>
      </Row>
      <Row>
        <Col className="select_level" md={2} sm={2} xs={2}>Level</Col>
        <Col className="select_cost" md={3} sm={3} xs={3}>Cost</Col>
      </Row>
      <Row>
        <Col className="select_level_ans" md={2} sm={2} xs={2}>EASY</Col>
        <Col className="select_cost_ans" md={3} sm={3} xs={3}>$40</Col>
      </Row>
      <Row>
        <Col className="select_week" md={{ span: 6, offset: 6 }}  sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }}>{item.livespan} Months</Col>
      </Row>
      <Row>
        <Col className="select_evaluation" md={{ span: 6, offset: 6 }}  sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }}>介紹</Col>
      </Row>
      <Row>
        <Col className="select_evaluation_ans" md={{ span: 6, offset: 6 }}  sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }}>
          {item.environment}</Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 6 }}  sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }}>
          <Button size="sm"  className="select_btn">Select</Button>{' '}
        </Col>
      </Row>
        </div>
        </Col>
    </Row>
    )
  })


  return (
    <div className="body_select">
      <Container>
        <Row><Sidebar /></Row>
        {template}              
      </Container>
    </div> 
  )
}

export default Select;