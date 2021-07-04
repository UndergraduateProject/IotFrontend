import React, { useState, useEffect } from "react";
import './chart.css';
import { Line } from 'react-chartjs-2';
import api from '../utils/api';

const path = "api/Humidtemp/?limit=100";


function Chart() {
  const [chart, setChart] = useState({});
  var labels = [];
  var dataValue = [];
  const getdata = () => {
    api.get(path).then(response => {
      console.log(response);
      response['results'].forEach(ele => {
        labels.push(ele.timestamp);
        dataValue.push(ele.humidity);
      });
    setChart({
      labels: labels,
      datasets: [
        {
          label: 'Humidity',
          data: dataValue,
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
          yAxisID: 'y-axis-1',
        },
      ],
    })
    })
  };

  useEffect(() => {
    getdata();
  }, []);
  
  return (
    <div>
      <Line  data={chart} />
    </div>
  )
}

export default Chart
