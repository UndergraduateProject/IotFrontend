import React, {useEffect, useState} from 'react';
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
import socketIOClient from "socket.io-client";
import Thermometer from 'react-thermometer-component'



const endpoint = "http://140.117.71.98:4001";
const socket = socketIOClient(endpoint);
socket.on("connect_error", () => {
  setTimeout(() => {
    socket.connect();
  }, 1000);
});

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

  const [template, setTemplate] = useState()
  const [data, setData] = useState({
    "temperature": 0,
    "humidity":0,
  });
  useEffect(()=>{   
    socket.on("monitor",res=>{
        res = JSON.parse(res)
        if(res){
          setData(res);
        }
    })
  },[])

  useEffect(()=>{
    setTemplate(lighttemplate)
  },[])

  const changetemplate = (string) =>{
    switch (string) {
      case "light":
        setTemplate(lighttemplate);
        break;
      
      case "temp":
        setTemplate(temptemplate);
        break;

      case "humid":
        setTemplate(humiditytemplate);
        break;
      
      default:
        setTemplate(lighttemplate);
        break;
    }
  }

  const lighttemplate = (<div className="monitor_light" onClick={()=>changetemplate("light")}> 
                          <div className="monitor_light2">Light</div>
                          <div><img className="monitor_light_pic" src={light} alt=""/></div>
                          <div className="monitor_light1">40%</div>
                        </div>);
  
  const temptemplate = (<div className="monitor_temp" onClick={()=>changetemplate("temp")}> 
                          <div className="monitor_temp2">Temperature</div>
                          <div><img className="monitor_cloud_pic" src={cloud} alt=""/></div>
                          <div className="monitor_temp1">{data.temperature.toFixed(2)}°C</div>
                        </div>)
  
  const humiditytemplate = (<div className="monitor_humi" onClick={()=>changetemplate("humid")}> 
                              <div className="monitor_humi2">Humidity</div>
                              <div><img className="monitor_water_pic" src={water} alt=""/></div>
                              <div className="monitor_humi1">{data.humidity.toFixed(2)}%</div>
                            </div>)


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
            {template}
            <div className=" monitor_detail">這邊放各種資訊abcdsfwrfsfsdldf(亂打)</div>
          </div>


          {/* slider */}
         
          <Carousel itemPadding={[97, 10]} className="slider_adjust" itemsToShow={2}>
            <Item>
              {lighttemplate}
            </Item>

            <Item>
              {temptemplate}
            </Item>
            
            <Item>
              {humiditytemplate}
            </Item>
            
            <Item>
              {/* water tank */}
            </Item>

            <Item>
              {/* mositure */}
            </Item>

            <Item>

            </Item>
          </Carousel>
         
          {/* slider */}
    </div>
  )
}

export default Monitor;
