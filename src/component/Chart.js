import React, { useState, useEffect } from "react";
import './chart.css';
import { Line } from 'react-chartjs-2';
import api from '../utils/api';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import {Spinner} from 'react-bootstrap'
import { addDays } from 'date-fns';


const path = "api/Humidtemp/?limit=99999999999999999";


function Chart() {
  const today = new Date().getDate();
  const [chart, setChart] = useState({});
  const [loading,setLoading] = useState(false);
  const [selectionRange, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const changedate = (item) => {
    setRange([item.selection]);
    getdata();
  }

  var labels = [];
  var dataValue = [];
  const getdata = () => {
    api.get(path).then(response => {
      response['results'].forEach(ele => {
        var date = new Date(ele.timestamp).getDate();
        var month = new Date(ele.timestamp).getMonth();
        var year = new Date(ele.timestamp).getFullYear();
        if(date >= selectionRange[0].startDate.getDate() && date <= selectionRange[0].endDate.getDate()){
          labels.push(ele.timestamp);
          dataValue.push(ele.humidity);
        }
      });
    setLoading(true) 
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
      <div className="chart">{loading ? <Line  data={chart} /> :<Spinner animation="border" role="status"></Spinner>}</div>
      <div className="date">
        <DateRangePicker
          editableDateInputs={true}
          onChange={changedate}
          moveRangeOnFirstSelection={false}
          ranges={selectionRange}
          maxDate={addDays(new Date(), 0)}
        />
      </div>
    </div>
  )
}

export default Chart
