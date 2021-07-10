import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col,Button} from 'react-bootstrap';
import "./select.css";
import select_potato from "../../images/select_potato.png";
import select_cabbage from "../../images/select_cabbage.png";
import select_tomato from "../../images/select_tomato.png";
import Sidebar from '../../component/Sidebar';



function select() {
  return (
    <div className="body_select">
      <Container>
        <Row><Sidebar /></Row>
              <Row>
                <Col  md={{ span: 10, offset: 1 }}  sm={{ span: 10, offset: 1 }} xs={{ span: 10, offset: 1 }}> 
                  <div className="select_plant" >
                    {/* <div className="left"> */}
                      <Row>
                        <Col md={6}  sm={6} xs={6}><img className="select_potato_pic" src={select_potato}/></Col>
                      </Row>

                      <Row>
                        <Col className="select_title">Potato</Col>
                      </Row>

                      <Row>
                        <Col className="select_level" md={2} sm={2} xs={2}>Level</Col>
                        <Col className="select_cost" md={3} sm={3} xs={3}>Cost</Col>
                      </Row>

                      <Row>
                        <Col className="select_level_ans" md={2} sm={2} xs={2}>EASY</Col>
                        <Col className="select_cost_ans" md={3} sm={3} xs={3}>$40</Col>
                      </Row>
                    {/* </div>  */}
                    {/* <div className="right"> */}
                      <Row>
                        <Col className="select_week" md={{ span: 6, offset: 6 }}  sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }}>5 Weeks</Col>
                      </Row>

                      <Row>
                        <Col className="select_evaluation" md={{ span: 6, offset: 6 }}  sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }}>self-evaluation</Col>
                      </Row>

                      <Row>
                        <Col className="select_evaluation_ans" md={{ span: 6, offset: 6 }}  sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }}>
                          I am Potato,The potato is a root vegetable native to the America.</Col>
                      </Row>

                      <Row>
                        <Col md={{ span: 6, offset: 6 }}  sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }}>
                        <Button size="sm"  className="select_btn">Select</Button>{' '}
                        </Col>
                      </Row>

                    </div>
                  {/* </div> */}
                </Col>
              </Row>




              <Row>
                <Col  md={{ span: 10, offset: 1 }}  sm={{ span: 10, offset: 1 }} xs={{ span: 10, offset: 1 }}> 
                  <div className="select_plant select_plant2" >
                    {/* <div className="left"> */}
                      <Row>
                        <Col md={6}  sm={6} xs={6}><img className="select_potato_pic" src={select_cabbage}/></Col>
                      </Row>

                      <Row>
                        <Col className="select_title">Cabbage</Col>
                      </Row>

                      <Row>
                        <Col className="select_level" md={2} sm={2} xs={2}>Level</Col>
                        <Col className="select_cost" md={3} sm={3} xs={3}>Cost</Col>
                      </Row>

                      <Row>
                        <Col className="select_level_ans" md={2} sm={2} xs={2}>EASY</Col>
                        <Col className="select_cost_ans" md={3} sm={3} xs={3}>$100</Col>
                      </Row>
                    {/* </div>  */}
                    {/* <div className="right"> */}
                      <Row>
                        <Col className="select_week" md={{ span: 6, offset: 6 }}  sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }}>10 Weeks</Col>
                      </Row>

                      <Row>
                        <Col className="select_evaluation" md={{ span: 6, offset: 6 }}  sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }}>self-evaluation</Col>
                      </Row>

                      <Row>
                        <Col className="select_evaluation_ans" md={{ span: 6, offset: 6 }}  sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }}>
                         Cabbage is a leafy green, red purple or white (pale green) biennial plant. </Col>
                      </Row>

                      <Row>
                        <Col md={{ span: 6, offset: 6 }}  sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }}>
                        <Button size="sm"  className="select_btn">Select</Button>{' '}
                        </Col>
                      </Row>

                    </div>
                  {/* </div> */}
                </Col>
              </Row>




              <Row>
                <Col  md={{ span: 10, offset: 1 }}  sm={{ span: 10, offset: 1 }} xs={{ span: 10, offset: 1 }}> 
                  <div className="select_plant select_plant3" >
                    {/* <div className="left"> */}
                      <Row>
                        <Col md={6}  sm={6} xs={6}><img className="select_potato_pic" src={select_tomato}/></Col>
                      </Row>

                      <Row>
                        <Col className="select_title">Tomato</Col>
                      </Row>

                      <Row>
                        <Col className="select_level" md={2} sm={2} xs={2}>Level</Col>
                        <Col className="select_cost" md={3} sm={3} xs={3}>Cost</Col>
                      </Row>

                      <Row>
                        <Col className="select_level_ans" md={2} sm={2} xs={2}>HIGH</Col>
                        <Col className="select_cost_ans" md={3} sm={3} xs={3}>$60</Col>
                      </Row>
                    {/* </div>  */}
                    {/* <div className="right"> */}
                      <Row>
                        <Col className="select_week" md={{ span: 6, offset: 6 }}  sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }}>12 Weeks</Col>
                      </Row>

                      <Row>
                        <Col className="select_evaluation" md={{ span: 6, offset: 6 }}  sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }}>self-evaluation</Col>
                      </Row>

                      <Row>
                        <Col className="select_evaluation_ans" md={{ span: 6, offset: 6 }}  sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }}>
                        A rose is a woody perennial flowering plant of the genus Rosa.</Col>
                      </Row>

                      <Row>
                        <Col md={{ span: 6, offset: 6 }}  sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }}>
                        <Button size="sm"  className="select_btn">Select</Button>{' '}
                        </Col>
                      </Row>

                    </div>
                  {/* </div> */}
                </Col>
              </Row>

             
              <Row >                 
                <Col  className="select_next_top" md={6}  sm={6} xs={6}>
                <a  className="select_next1"herf="#"> {'<'}{'<'}上一頁</a> 
                </Col> 

                <Col  className="select_next_top2" md={6}  sm={6} xs={6}>
                <a  className="select_next1"herf="#">下一頁{'>'}{'>'}</a> 
                </Col> 
              </Row>
              
      </Container>
    </div> 
  )
}

export default select;
