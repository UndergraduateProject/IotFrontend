import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./monitor.css"
import { Row, Col } from "react-bootstrap"
import light from "../../images/monitor_light.png"
import cloud from "../../images/cloud.png"
import battery from "../../images/battery.png"
import water from "../../images/monitor_water.png"
import water_volume from "../../images/water_volume.png"
import soil from "../../images/soil.png"
import Sidebar from "../../component/Sidebar"
import Carousel from "react-elastic-carousel"
import styled from "styled-components"
import socketIOClient from "socket.io-client";
import Thermometer from 'react-thermometer-component'
import api from "../../utils/api";
import useFitText from "use-fit-text";


const ColorHelper = require('color-to-name');



const weatherurl = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-D0F2090C-5F48-45D5-B0D7-ACE9030246B0&locationName=%E9%AB%98%E9%9B%84";
const endpoint = "http://140.117.71.98:4001";
const socket = socketIOClient(endpoint);
socket.on("connect_error", () => {
  setTimeout(() => {
    socket.connect()
  }, 1000)
})

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
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function Monitor() {
  const [weather, setWeather] = useState("載入中")
  const [temperature, setTemperature] = useState("...")
  const [template, setTemplate] = useState()
  const [detail, setDetail] = useState()
  const [data, setData] = useState({
    "temperature": 0,
    "humidity":0,
  });
  const [moisture, setMoisture] = useState(0)
  const [selecter, setSelect] = useState({
    light: true,
    temperature: false,
    humidity: false,
    moisture: false,
    volume: false,
    battery: false,
  })
  const [color, setColor] = useState()
  const { fontSize, ref} = useFitText({
    maxFontSize:150,
  });
  const [fan, setFan] = useState()
  const [waterdata, setWater] = useState({
    volume : 0,
    timestamp : '',
  })

  useEffect(() => {
    socket.on("monitor", (res) => {
      res = JSON.parse(res)
      if (res) {
        setData(res)
      }
    })
  }, [])

  useEffect(() => {
    var url = "api/Humidtemp/"
    api.get(url).then((res) => {
      const count = res.count
      url = url + count + "/";
      api.get(url).then((res) => {
        setData(res)
      })
    })
  }, [])

  useEffect(()=>{
    var url = "api/Moisture/";
    api.get(url)
    .then(res => {
      const count = res.count
      url = url + count + "/";
      api.get(url)
      .then(res=>{
        setMoisture(res.moisture)
      })
    })
  },[])

  useEffect(()=>{
    var url = "api/Wartering/";
    api.get(url)
    .then(res => {
      const count = res.count
      url = url + count + "/";
      api.get(url)
      .then(res=>{
          setWater({
            volume : res.volume,
            timestamp : res.timestamp,
          })
      })
    })
  })

  //current weather
  useEffect(() => {
    fetch(weatherurl)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        //天氣現象 weather
        const weather = data.records.location[0].weatherElement[20].elementValue
        const temperature = parseInt(data.records.location[0].weatherElement[3].elementValue).toFixed(0)
        setWeather(data.records.location[0].weatherElement[20].elementValue)
        setTemperature(parseInt(data.records.location[0].weatherElement[3].elementValue).toFixed(0) + "°C")
        console.log(typeof data.records.location[0].weatherElement[3].elementValue)
        console.log(data.records.location[0])

        //////////////設定 天氣照片 多雲，晴天，雨天，陰天 幾個重要的就好////////////////
        if (weather === "晴") {
          document.getElementById("weatherimg").src =
            "https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/01.svg"
        }
        if (weather === "雨") {
          document.getElementById("weatherimg").src =
            "https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/08.svg"
        }
        if (weather === "陰") {
          document.getElementById("weatherimg").src =
            "https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/07.svg"
        }
        if (weather === "多雲") {
          document.getElementById("weatherimg").src =
            "https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/04.svg"
        }
        ////////////////////////////////////////////////////////////////////////////////////////
      })
  },[])

  //fan
  useEffect(()=>{
    var url = "api/Fan/";
    api.get(url)
    .then(res => {
      var offset = (Math.floor(res.count/10))*10;
      var offseturl = url + "?offset=" + offset;
      api.get(offseturl)
      .then(res=>{
        if(res.results.length){
          const status = res.results[res.results.length-1].switch;
          if(status == "ON"){
            setFan("ON")
          }
          else{
            setFan("OFF")
          }
        }
        else{
          offset -= 10;
          var newurl = url + "?offset=" + offset;
          api.get(newurl)
          .then(res=>{
            const status = res.results[res.results.length-1].switch;
            if(status == "ON"){
              setFan("ON")
            }
            else{
              setFan("ON")
          }
          })
        }
      })
    })
  },[])

  

  //change main detail
  const changetemplate = (string) => {
    switch (string) {
      case "light":
        setTemplate(lighttemplate)
        setDetail(lightdetail)
        break

      case "temp":
        setTemplate(temptemplate)
        setDetail(tempdetail)
        break

      case "humid":
        setTemplate(humiditytemplate)
        setDetail(humiddetail)
        break

      case "moisture":
        setTemplate(moisturetemplate)
        setDetail(moistuiredetail)
        break

      case "volume":
        setDetail(volumedetail)
        setTemplate(volumetemplate)
        break

      case "battery":
        setDetail(batterydetail)
        setTemplate(batterytemplate)
        break

      default:
        setTemplate(lighttemplate)
        setDetail(lightdetail)
        break
    }
    setSelect({
      light: "light" == string ? true : false,
      temperature: "temp" == string ? true : false,
      humidity: "humid" == string ? true : false,
      moisture: "moisture" == string ? true : false,
      volume: "volume" == string ? true : false,
      battery: "battery" == string ? true : false,
    })
  }

  //LED
  function getColor(results){
    const red = results[0].red;
    const green = results[0].green;
    const blue = results[0].blue;
    const brightness = results[0].brigthness
    const switchs = results[0].switch
    // setLightColor({
    //   "R": red,
    //   "G": green,
    //   "B": blue,
    //   "brightness":brightness,
    //   "switch":switchs,
    //   })
    const hex = rgbToHex(red,green,blue)
    setColor(ColorHelper.findClosestColor(hex).name)
  }

  useEffect(()=>{
    var url = "api/LED/";
    api.get(url)
    .then(res=>{
      var offset = (Math.floor(res.count/10))*10;
      var offseturl = url + "?offset=" + offset;
      api.get(offseturl)
      .then(res=>{
        if(res.results.length){
          res.results = res.results.reverse()
          getColor(res.results)
        }
        else{
          offset -= 10;
          var newurl = url + "?offset=" + offset;
          api.get(newurl)
          .then(res=>{
            res.results = res.results.reverse()
            getColor(res.results)
          })
        }
      })
    })
  },[])
  //LED

  const lighttemplate = (
    <div
      className={selecter["light"] ? "selected monitor_light" : "monitor_light"}
      onClick={() => changetemplate("light")}
    >
      <div className="monitor_light2">亮度</div>
      <div>
        <img className="monitor_light_pic" src={light} alt="" />
      </div>
      <div className="monitor_light3">87%</div>
      <div className="monitor_light1">{color}</div>
    </div>
  )

  const lightdetail = (<div>
                            <div>今天日照時長:5小時</div>
                            <div>目前燈色:{color}</div>
                            <div>推薦燈色:red</div>
                        </div>);
  
  const temptemplate = (<div className={selecter["temperature"] ? "selected monitor_temp" : "monitor_temp"} onClick={()=>changetemplate("temp")}> 
                          <div className="monitor_temp2">溫度</div>
                          <div><img className="monitor_cloud_pic" src={cloud} alt=""/></div>
                          <div className="monitor_temp1">{data.temperature.toFixed(0)}°C</div>
                        </div>)

  const tempdetail = (<div>
                        <div>溫室內溫度:<br />{data.temperature.toFixed(0)}°C</div>
                        <div>風扇是否開啟:{fan}</div>
                        <div>推薦溫度:28°C</div>
                    </div>);
  
  const humiditytemplate = (<div className={selecter["humidity"] ? "selected monitor_humi" : "monitor_humi"} onClick={()=>changetemplate("humid")}> 
                              <div className="monitor_humi2">濕度</div>
                              <div><img className="monitor_water_pic" src={water} alt=""/></div>
                              <div className="monitor_humi1">{data.humidity.toFixed(0)}%</div>
                            </div>)

  const humiddetail = (<div>
                        <div>空氣相對濕度:{data.humidity.toFixed(0)}%</div>
                        <div>推薦濕度:30%~50%</div>
                      </div>);

  const batterytemplate = (<div className={selecter["battery"] ? "selected monitor_battery" : "monitor_battery"} onClick={()=>changetemplate("battery")}>
                            <div className="monitor_battery2">電量</div>
                            <div><img className="monitor_battery_pic" src={battery} alt=""/></div>
                            <div className="monitor_battery1">87%</div>
                          </div>)  
                          
  const batterydetail = (<div>
    <div>電池電量剩餘時間 ：小於8小時</div>
  </div>)
  
  const volumetemplate = (<div className={selecter["volume"] ? "selected monitor_water_volume" : "monitor_water_volume"} onClick={()=>changetemplate("volume")}>
                            <div className="monitor_water_volume2">水量</div>
                            <div><img className="monitor_water_volume_pic" src={water_volume} alt=""/></div>
                            <div className="monitor_water_volume1">45 %</div>
                          </div>)

  const volumedetail = (<div>
    <div>上次澆水日期:{waterdata.timestamp}</div>
    <div>上次澆水量：{waterdata.volume}</div>
  </div>);
  
  const moisturetemplate = (<div className={selecter["moisture"] ? "selected monitor_soil" : "monitor_soil"} onClick={()=>changetemplate("moisture")}>
                              <div className="monitor_soil2">土壤濕度</div>
                              <div><img className="monitor_soil_pic" src={soil} alt=""/></div>
                              <div className="monitor_soil1">{moisture}%</div>
                            </div>)


  const moistuiredetail = (
    <div>
      <div>植物推薦土壤濕度：65%~75%</div>
    </div>
  )

  //initialize
  useEffect(() => {
    setTemplate(lighttemplate)
    setDetail(lightdetail)
  }, [color])

  return (
    <div className="monitor_body">
      <Row>
        <Sidebar />
      </Row>
      <Row>
        <Col className="monitor_top1" md={{ span: 3, offset: 9 }} sm={{ span: 3, offset: 9 }} xs={{ span: 3, offset: 9 }}>
          <img id="weatherimg" className="monitor_wea_pic" alt=""/>
        </Col>
      </Row>

      <Row>
        <Col
          className="monitor_top2" md={{ span: 6, offset: 6 }} sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }}>
          {weather}
          {temperature}
        </Col>
      </Row>

      <Row>
        <Col className="monitor_top3" md={12} sm={12} xs={12}>
          Monitoring Status
        </Col>
      </Row>

      <div className="monitor_background">
        {template}
        <div className="monitor_detail">{detail}</div>
      </div>

      {/* slider */}

      <Carousel itemPadding={[97, 10]} className="slider_adjust selector" itemsToShow={2}
>
        <Item>{lighttemplate}</Item>

        <Item>{temptemplate}</Item>

        <Item>{humiditytemplate}</Item>

        <Item>{volumetemplate}</Item>

        <Item>{moisturetemplate}</Item>

        <Item>{batterytemplate}</Item>
      </Carousel>

      {/* slider */}
    </div>
  )
}

export default Monitor