import React from 'react';
import "./select.css";
import select_potato from "./select_potato.png";
import select_cabbage from "./select_cabbage.png";
import select_tomato from "./select_tomato.png";




function select() {
  return (
    <div className="body_select">
    <div className="select_plant" >
      <div className="left">
          <img className="select_potato_pic" src={select_potato}/>
          <div className="plant_title">Potato</div>
            <div className="plant_level">Level</div>
            <div className="plant_cost">Cost</div>
          <div className="plant_level_answer">easy</div>
          <div className="plant_cost_answer">$30</div>
      </div>

    <div className="right">
        <div className="plant_week">5Weeks</div>
        <div className="plant_evaluation">self-evaluation:</div>
        <div className="plant_evaluation_answer">I am Potato,The potato is a root vegetable native to the Americas.</div>
        <input className="select_button" type="button"  value="Select" />
    </div>
    </div>

    <div className="select_plant select_plant1" >
      <div className="left">
          <img className="select_potato_pic" src={select_cabbage}/>
          <div className="plant_title">Cabbage</div>
            <div className="plant_level">Level</div>
            <div className="plant_cost">Cost</div>
          <div className="plant_level_answer">easy</div>
          <div className="plant_cost_answer">$200</div>
      </div>

    <div className="right">
        <div className="plant_week">10Weeks</div>
        <div className="plant_evaluation">self-evaluation:</div>
        <div className="plant_evaluation_answer">Cabbage is a leafy green, red purple or white (pale green) biennial plant. </div>
        <input className="select_button" type="button"  value="Select" />
    </div>
    </div>

    <div className="select_plant select_plant2" >
      <div className="left">
          <img className="select_potato_pic" src={select_tomato}/>
          <div className="plant_title">Tomato</div>
            <div className="plant_level">Level</div>
            <div className="plant_cost">Cost</div>
          <div className="plant_level_answer">high</div>
          <div className="plant_cost_answer">$700</div>
      </div>

    <div className="right">
        <div className="plant_week">12Weeks</div>
        <div className="plant_evaluation">self-evaluation:</div>
        <div className="plant_evaluation_answer">A rose is a woody perennial flowering plant of the genus Rosa.</div>
        <input className="select_button" type="button"  value="Select" />
    </div>
    </div>
    
    <div class="footer_select "></div>  
    </div>   
  )
}

export default select;
