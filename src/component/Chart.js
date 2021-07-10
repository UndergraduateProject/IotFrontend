import React, { useState, useEffect } from "react";
import './chart.css';
import ApexCharts from 'apexcharts'
import api from '../utils/api';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file



const path = "api/Humidtemp/?limit=99999999999999999";



function Chart() {
  const [chart, setChart] = useState({});
  const [loading,setLoading] = useState(false);
  const [series,setSerires] = useState([{
    data : [{
      x:0,
      y:0,
    }]
  }])
  const [options, setOption] = useState({
    options: {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      title: {
        text: 'Stock Price Movement',
        align: 'left'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
        },
        title: {
          text: 'Price'
        },
      },
      xaxis: {
        type: 'datetime',
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0)
          }
        }
      }
    },
  }) 
  
  const changedate = (item) => {
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
        labels.push(ele.timestamp);
        dataValue.push(ele.humidity);
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
      <div id="chart-line">
        <ApexCharts options={options} series={this.state.series} type="line" height={160} />
      </div>
    </div>
  )
}

export default Chart
