import React from 'react';
import "./control.css";
import control_greenHouse from './control_greenHouse.png';
import control_battery from './control_battery.png';
import control_capacity from './control_capacity.png';
import control_light from './control_light.png';
import control_duration from './control_duration.png';
import control_close from './control_close.png';



function control() {
  return (
    <div className="body_control container-fluid">
      <div className="row"><img className="control_house_pic" src={control_greenHouse}/></div>
      <input className="control_button1" type="button"  value="Change" />
      <div className="control_top">Catalogue</div>

      <div className="control_top1">Battery</div>
      <div className="control_top1 control_top2 ">Capacity</div>
      <div className="control_top1 control_top3 ">Light</div>

      <div className="control_input1">50%</div>
      <div className="control_input1 control_input2">750ml</div>
      <div className="control_input1 control_input3">40%</div>

      <img className="control_battery_pic" src={control_battery}/>
      <img className="control_capacity_pic" src={control_capacity}/>
      <img className="control_light_pic" src={control_light}/>

      <div className="control_input1 control_input4">30 Min</div>
      <div className="control_input1 control_input5">Open</div>

      <div className="control_top1 control_top4 ">Duration</div>
      <div className="control_top1 control_top5 ">Close</div>
      
      <img className="control_duration_pic" src={control_duration}/>
      <img className="control_close_pic" src={control_close}/>
      
      <input className="control_button1  control_button2" type="button"  value="Power on" />
      
      <div class="footer_control "></div>

      
    </div>   
  )
}

export default control;
