import React, { useState, useEffect } from "react";
import './chart.css';
import { Line } from 'react-chartjs-2';
import api from '../utils/api';

const path = "api/Humidtemp/?limit=100";


function Chart() {
  const [chart, setChart] = useState({});
  const date = new Date('07/05/2021 22:03:04')
  console.log(date.getHours())
  

  useEffect(() => {
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
    getdata();
  }, []);
  
  return (
    <div>
      <Line  data={chart} />
    </div>
  )
}

export default Chart
