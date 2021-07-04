import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./monitor.css";
import {Container, Row, Col} from 'react-bootstrap';
import monitor_weather from './monitor_weather.png';
import light from './light.png';
import cloud from './cloud.png';
import water from './water.png';
import Sidebar from '../../component/Sidebar'


function Monitor() {
  return (
    <div className="monitor_body">
      <Container>
        <Row><Sidebar /></Row>
          <Row>
            <Col className="monitor_top1" md={{ span: 3, offset: 9 }}  sm={{ span: 3, offset: 9 }} xs={{ span: 3, offset: 9 }}>
              <img className="monitor_wea_pic" src= { monitor_weather }/>
            </Col>
          </Row>

          <Row>
            <Col className="monitor_top2"  md={{ span: 6, offset: 6 }}  sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }}>
              晴時多雲
            </Col>
          </Row>

          <Row>
            <Col className="monitor_top3" md={12} sm={12} xs={12}>
              "Monitoring Status"
            </Col>
          </Row>

          <Row>
            <Col md={12} sm={12} xs={12}>
                <div className="monitor_background"> 
                  <div className="monitor_light"> <div className="monitor_light2">light</div>
                    <div><img className="monitor_light_pic" src={light}/></div>
                    <div className="monitor_light1">40%</div>
                  </div>
                  <div className=" monitor_detail">這邊放各種資訊abcdsfwrfsfsdldf(亂打)</div>
                </div>
            </Col> 
          </Row>

          <Row>
            <Col md={6} sm={6} xs={6}>
              <div className="monitor_temp"> <div className="monitor_temp2">Temperature</div>
                <div><img className="monitor_cloud_pic" src={cloud} /></div>
                <div className="monitor_temp1">25°C</div>
              </div>
            </Col>
            <Col md={6} sm={6} xs={6}>
              <div className="monitor_humi"> <div className="monitor_humi2">Humidity</div>
                <div><img className="monitor_water_pic" src={water} /></div>
                <div className="monitor_humi1">35%</div>
              </div>
            </Col>
          </Row> 

      </Container>
    </div>
  )
}

export default Monitor;
