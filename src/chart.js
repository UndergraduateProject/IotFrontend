import React, { useState, useEffect } from "react";
import ReactDOM, { render } from 'react-dom';
import './chart.css';
import { Line } from 'react-chartjs-2';
import api from './utils/api';

const path = "/api/humidtemp/";

const linedata = {
  labels: [],
  datasets: [
    {
      label: 'Humidity',
      data: [],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
      yAxisID: 'y-axis-1',
    },
    {
      label: 'Temperature',
      data: [],
      fill: false,
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgba(54, 162, 235, 0.2)',
      yAxisID: 'y-axis-2',
    },
  ],
};


function Chart() {
  const [data, setData] = useState([]);
  const [view,setView]  = useState(true);
  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    api.get('api/humidtemp/').then(response => {
      console.log(response);
      let humidity = [];
      response['results'].forEach(ele => humidity.push(ele));
      humidity.forEach(
      ele => {
        linedata.datasets[0].data.push(ele.humidity)
        linedata.datasets[1].data.push(ele.temperature)
        linedata.labels.push(ele.created)
      }
    )
    setData(humidity);
    })
  };
  
  if(view){
    var msg = "show chart";
  }
  else{
    var msg = "show raw data";
  }
  return (
    <div>
      {
        view ? <ul>{data.map((x, i) => <li key={i}>id : {x.id}   humidity : {x.humidity}  temperature : {x.temperature}   created : {x.created}</li>)}</ul> 
        : <Line  data={linedata} />
      }
      <button onClick={()=> setView(!view)}>{msg}</button>
    </div>
  )
}

export default Chart
