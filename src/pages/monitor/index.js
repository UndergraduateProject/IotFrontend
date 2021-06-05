import React from 'react';
import "./monitor.css";
import monitor_weather from './monitor_weather.png';

import monitor_light1 from './monitor_light1.png';
import monitor_temperature from './monitor_temperature.png';
import monitor_humidity from './monitor_humidity.png';
import monitor_detail from './monitor_detail.png';
import monitor_arrow_left from './monitor_arrow_left.png';
import monitor_arrow_right from './monitor_arrow_right.png';



function Monitor() {
  return (
    <div className="body_monitor">

      <div className="monitor_top">Green House</div>
      <div className="monitor_top1">Monitoring Status</div>
      
      <img className="monitor_wea_pic" src={monitor_weather}/>
      <div className="monitor_top3">晴時多雲</div>
      

      <div className="wrap_light">
        <img className="monitor_light_pic" src={monitor_light1}/>
          <div className="monitor_top2">40%</div>
      </div>

      <div className="wrap_detail">
        <img className="monitor_detail_pic" src={monitor_detail}/>
          <div className="monitor_top6">隨便亂打:))*^$#%$%/\';$%</div>
      </div>

        <img className="monitor_arrow_left" src={monitor_arrow_left}/>

      <div className="wrap_temp">
        <img className="monitor_temp_pic" src={monitor_temperature}/>
          <div className="monitor_top4">37°c</div>
      </div>

      <div className="wrap_humi">
        <img className="monitor_humi_pic" src={monitor_humidity}/>
          <div className="monitor_top5">35%</div>
      </div>

        <img className="monitor_arrow_right" src={monitor_arrow_right}/>

        <div class="footer_monitor "></div>

      </div>   
  )
}

export default Monitor;
