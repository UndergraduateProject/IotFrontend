import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./monitor.css";
import {Row, Col} from 'react-bootstrap';
import monitor_weather from '../../images/monitor_weather.png';
import light from '../../images/monitor_light.png';
import cloud from '../../images/cloud.png';
import battery from '../../images/battery.png';
import water from '../../images/monitor_water.png';
import water_volume from '../../images/water_volume.png';
import soil from '../../images/soil.png';
import Sidebar from '../../component/Sidebar'
import Carousel from 'react-elastic-carousel'
import styled from "styled-components"
import socketIOClient from "socket.io-client";
import Thermometer from 'react-thermometer-component'
import api from "../../utils/api";


const weatherurl = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-D0F2090C-5F48-45D5-B0D7-ACE9030246B0&locationName=%E9%AB%98%E9%9B%84";
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
  const [weather, setWeather] = useState();
  const [template, setTemplate] = useState();
  const [detail, setDetail] = useState();
  const [data, setData] = useState({
    "temperature": 0,
    "humidity":0,
  });
  const [selecter, setSelect] = useState({
    "light": true,
    "temperature" : false,
    "humidity" : false,
  })

  useEffect(()=>{   
    socket.on("monitor",res=>{
        res = JSON.parse(res)
        if(res){
          setData(res);
        }
    })
  },[]);

  useEffect(()=>{
    var url = "api/Humidtemp/";
    api.get(url)
    .then(res => {
      const offset = (Math.floor(res.count/10))*10;
      url = url + "?offset=" + offset;
      api.get(url)
      .then(res=>{
        setData(res.results[res.results.length-1])
      })
    })
  },[])

  //initialize
  useEffect(()=>{
    setTemplate(lighttemplate);
    setDetail(lightdetail);
  },[]);

  //current weather
  useEffect(()=>{
    fetch(weatherurl)
    .then(res=>{
      return res.json();
    })
    .then(data=>{
      setWeather(data.records.location[0].weatherElement[20].elementValue)
    })
  })

  //change main detail
  const changetemplate = (string) =>{
    switch (string) {
      case "light":
        setTemplate(lighttemplate);
        setDetail(lightdetail);
        break;
      
      case "temp":
        setTemplate(temptemplate);
        setDetail(tempdetail);
        break;

      case "humid":
        setTemplate(humiditytemplate);
        setDetail(humiddetail);
        break;
      
      default:
        setTemplate(lighttemplate);
        setDetail(lightdetail);
        break;
    }
    setSelect({
      "light": "light" == string ? true:false,
      "temperature" : "temp" == string ? true:false,
      "humidity" : "humid" == string ? true:false,
    })
  }

  const lighttemplate = (<div className={selecter["light"] ? "selected monitor_light" : "monitor_light"} onClick={()=>changetemplate("light")}> 
                          <div className="monitor_light2">亮度</div>
                          <div><img className="monitor_light_pic" src={light} alt=""/></div>
                          <div className="monitor_light1">Green</div>
                        </div>);

  const lightdetail = (<div>
                            <div>今天日照時長:</div>
                            <div>目前燈色:</div>
                            <div>推薦燈色:</div>
                        </div>);
  
  const temptemplate = (<div className={selecter["temperature"] ? "selected monitor_temp" : "monitor_temp"} onClick={()=>changetemplate("temp")}> 
                          <div className="monitor_temp2">溫度</div>
                          <div><img className="monitor_cloud_pic" src={cloud} alt=""/></div>
                          <div className="monitor_temp1">{data.temperature.toFixed(0)}°C</div>
                        </div>)

  const tempdetail = (<div>
                        <div>溫室內溫度:<br />{data.temperature.toFixed(0)}°C</div>
                        <div>風扇是否開啟:</div>
                        <div>推薦溫度:</div>
                    </div>);
  
  const humiditytemplate = (<div className={selecter["humidity"] ? "selected monitor_humi" : "monitor_humi"} onClick={()=>changetemplate("humid")}> 
                              <div className="monitor_humi2">濕度</div>
                              <div><img className="monitor_water_pic" src={water} alt=""/></div>
                              <div className="monitor_humi1">{data.humidity.toFixed(0)}%</div>
                            </div>)

  const humiddetail = (<div>
                        <div>空氣相對濕度:{data.humidity.toFixed(0)}%</div>
                        <div>推薦濕度:</div>
                      </div>);



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
              {weather}
            </Col>
          </Row>

          <Row>
            <Col className="monitor_top3" md={12} sm={12} xs={12}>
              "Monitoring Status"
            </Col>
          </Row>

          <div className="monitor_background"> 
            {template}
            <div className="monitor_detail">
              {detail}
            </div>
          </div>


          {/* slider */}
         
          <Carousel itemPadding={[97, 10]} className="slider_adjust selector" itemsToShow={2}>
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
              <div className="monitor_battery">
                <div className="monitor_battery2">電量</div>
                <div><img className="monitor_battery_pic" src={battery} alt=""/></div>
                <div className="monitor_battery1">87%</div>
              </div>
            </Item>

            <Item>
              <div className="monitor_water_volume">
                <div className="monitor_water_volume2">水量</div>
                <div><img className="monitor_water_volume_pic" src={water_volume} alt=""/></div>
                <div className="monitor_water_volume1">45.91%</div>
              </div>
            </Item>
      
            <Item>
              <div className="monitor_soil">
                <div className="monitor_soil2">土壤濕度</div>
                <div><img className="monitor_soil_pic" src={soil} alt=""/></div>
                <div className="monitor_soil1">10.66%</div>
              </div>
            </Item>
          </Carousel>
         
          {/* slider */}
    </div>
  )
}

export default Monitor;
