import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
const { get } = require('axios'); //這裡需要安裝package  "npm install axios" 

class Switch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      light_on : false,
    };
  }
	render(){
    const data = get("http://192.168.1.129:8000/enviroment/humidity/").then(response => console.log(response))
    const value = (this.state.light_on ? <p>turn off the light</p> : <p>turn on the light</p>);
    return (
      <div>
        <label className="switch">
          <input type="checkbox" onChange={() => this.setState({ light_on : !this.state.light_on })}></input>
          <span className="slider round"></span>
        </label>
      <p>{value}</p>
      </div>
    )
	}
}
  
// ========================================
  
ReactDOM.render(
	<Switch />,
	document.getElementById('root')
);