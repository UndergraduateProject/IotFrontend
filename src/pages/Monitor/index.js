import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./monitor.css";
import {Container, Row, Col} from 'react-bootstrap';
import monitor_weather from '../../images/monitor_weather.png';
import light from '../../images/monitor_light.png';
import cloud from '../../images/cloud.png';
import water from '../../images/monitor_water.png';
import Sidebar from '../../component/Sidebar'
import Carousel from 'react-elastic-carousel'
import styled from "styled-components"
/*should npm i styled-components     and      npm install react-elastic-carousel*/ 

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  // background-color: green;
  width: 100%;
  // height: 150px;
  // margin: 15px;
`


function Monitor() {
  return (
    <div className="monitor_body">
    
        <Row><Sidebar /></Row>
          <Row>
            <Col className="monitor_top1" md={{ span: 3, offset: 9 }}  sm={{ span: 3, offset: 9 }} xs={{ span: 3, offset: 9 }}>
              <img className="monitor_wea_pic" src= { monitor_weather } alt=""/>
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

          <div className="monitor_background"> 
            <div className=" monitor_detail">這邊放各種資訊abcdsfwrfsfsdldf(亂打)</div>
          </div>


          {/* slider */}
         
          <Carousel itemPadding={[97, 10]} className="slider_adjust" itemsToShow={2}>
            <Item>
              <div className="monitor_light"> <div className="monitor_light2">light</div>
                <div><img className="monitor_light_pic" src={light} alt=""/></div>
                <div className="monitor_light1">40%</div>
              </div>
            </Item>

            <Item>
              <div className="monitor_temp"> <div className="monitor_temp2">Temperature</div>
                <div><img className="monitor_cloud_pic" src={cloud} alt=""/></div>
                <div className="monitor_temp1">25°C</div>
              </div>
            </Item>
            
            <Item>
            <div className="monitor_humi"> <div className="monitor_humi2">Humidity</div>
                <div><img className="monitor_water_pic" src={water} alt=""/></div>
                <div className="monitor_humi1">35%</div>
              </div>
            </Item>
            
            <Item>
              <div className="monitor_light"> <div className="monitor_light2">light</div>
                <div><img className="monitor_light_pic" src={light} alt=""/></div>
                <div className="monitor_light1">40%</div>
              </div>
            </Item>

            <Item>
              <div className="monitor_temp"> <div className="monitor_temp2">Temperature</div>
                <div><img className="monitor_cloud_pic" src={cloud} alt=""/></div>
                <div className="monitor_temp1">25°C</div>
              </div>
            </Item>

            <Item>
            <div className="monitor_humi"> <div className="monitor_humi2">Humidity</div>
                <div><img className="monitor_water_pic" src={water} alt=""/></div>
                <div className="monitor_humi1">35%</div>
              </div>
            </Item>
          </Carousel>
         
          {/* slider */}

        
          {/* 
          <Row>
            <Col md={12} sm={12} xs={12}>
                <div className="monitor_background"> 
                  <div className="monitor_light"> <div className="monitor_light2">light</div>
                    <div><img className="monitor_light_pic" src={light} alt=""/></div>
                    <div className="monitor_light1">40%</div>
                  </div>
                  <div className=" monitor_detail">植物建議日照時長</div>
                  <div className=" monitor_detail">目前日照時長：2小時</div>
                  <div className=" monitor_detail">建議植物燈色：紅色</div>
                </div>
            </Col> 
          </Row>
          */}



          {/* <Row>
            <Col md={6} sm={6} xs={6}>
              <div className="monitor_temp"> <div className="monitor_temp2">Temperature</div>
                <div><img className="monitor_cloud_pic" src={cloud} alt=""/></div>
                <div className="monitor_temp1">25°C</div>
              </div>
            </Col>
            <Col md={6} sm={6} xs={6}>
              <div className="monitor_humi"> <div className="monitor_humi2">Humidity</div>
                <div><img className="monitor_water_pic" src={water} alt=""/></div>
                <div className="monitor_humi1">35%</div>
              </div>
            </Col>
          </Row>  */}
    </div>
  )
}

export default Monitor;
