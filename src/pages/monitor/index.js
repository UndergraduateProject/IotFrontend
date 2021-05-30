import React from 'react';
import "./monitor.css";
import monitor_weather from './monitor_weather.png';
import monitor_light from './monitor_light.png';
import monitor_temperature from './monitor_temperature.png';
import monitor_humidity from './monitor_humidity.png';


function Monitor() {
  return (
    <div className="body_monitor">

      <div className="monitor_top">Green House</div>
      <div className="monitor_top1">Monitoring Status</div>
      
      <img className="monitor_wea_pic" src={monitor_weather}/>
      <div className="monitor_top3">晴時多雲</div>
      
      <img className="monitor_light_pic" src={monitor_light}/>
      
        <div className="monitor_top2">40%</div>
      <img className="monitor_temp_pic" src={monitor_temperature}/>

        <div className="monitor_top4">37°c</div>
      <img className="monitor_humi_pic" src={monitor_humidity}/>

        <div className="monitor_top5">35%</div>
        <div class="footer_monitor "></div>

      </div>   
  )
}

export default Monitor;
