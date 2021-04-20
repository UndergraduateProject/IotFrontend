import React, { useState, useEffect } from "react";
import ReactDOM, { render } from 'react-dom';
import './index.css';
import axios from 'axios'; //這裡需要安裝package  "npm install axios" 
import { Line } from 'react-chartjs-2';
const url = "http://140.117.71.98:8000/enviroment/humidity/";

let linedata = {
  labels: [], //每一個點的時間點
  datasets: [
    {
      label: 'Humidity',
      data: [] //濕度資料儲存位置
    }
  ]
};


function App() {
  const [data, setData] = useState ([]);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    let humidity = Array();
    fetch(url).then(response => response.json())
      .then(response => {
        let d = response.results
        d.forEach(row => {
          humidity.push(row);
          linedata.datasets[0].data.push(row.value);
          linedata.labels.push(row.created);
        })
        setData(humidity);
      })
  }

  
  return (
    <div>
      <ul>{data.map((x,i) => <li key={i}>id : {x.id}   humidity : {x.value}     created : {x.created}</li>)}</ul>
      <Line data={linedata}/>
    </div>
  )
}
  
// ========================================
  
ReactDOM.render(
	<App />,
	document.getElementById('root')
);