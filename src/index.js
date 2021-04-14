import React, { useState, useEffect } from "react";
import ReactDOM, { render } from 'react-dom';
import './index.css';
import axios from 'axios'; //這裡需要安裝package  "npm install axios" 
import { Line } from 'react-chartjs-2';
const url = "http://140.117.71.98:8000/api/humidity/";

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
  const [data, setData] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const response = await axios.get(url);
    let humidity = [];
    console.log(response.data);
    response.data['results'].forEach(ele => humidity.push(ele));
    humidity.forEach(
      ele => {
        linedata.datasets[0].data.push(ele.value)
        linedata.labels.push(ele.created)
      }
    )
    setData(humidity);
  };



  return (
    <div>
      <ul>{data.map((x, i) => <li key={i}>id : {x.id}   humidity : {x.value}     created : {x.created}</li>)}</ul>
      <Line data={linedata} />
    </div>
  )
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);