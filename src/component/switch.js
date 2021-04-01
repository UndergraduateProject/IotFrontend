import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
const { get } = require('axios'); //這裡需要安裝package  "npm install axios" 

class Switch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      lists : [],
    };
  }
	render(){
    fetch("http://192.168.1.129:8000/enviroment/humidity/?limit=100").then( response => response.json().then( results => {
      let data = results['results'];
      this.setState({lists:data});
    }));
    const value = (this.state.light_on ? <p>turn off the light</p> : <p>turn on the light</p>);
    return (
      <ul>
        {this.state.lists.map(ele => <li>humidity:{ele.value}-createtime:{ele.created}</li>)}
      </ul>
    )
	}
}

export default Switch
//import Switch from './component/switch' 如果要在index import 加這個，記得 export default