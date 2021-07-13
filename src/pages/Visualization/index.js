import "./visualization.css"
import React, { useState, useEffect } from "react";
import Chart from 'react-apexcharts'
import api from '../../utils/api';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file



const path = "api/Humidtemp/?limit=999999";



function Visualization() {
  const [state, setState] = useState({
    humidoptions: {
        chart: {
            id: 'humidity',
						group :'enviroment',
            type: 'line',
            height: "100%",
			zoom: {
				type: 'x',
				enabled: true,
				autoScaleYaxis: true
			},
			toolbar: {
				autoSelected: 'zoom'
			}
			
          },
          colors: ['#008FFB'],
          yaxis: {
            labels: {
              minWidth: 40
            }
          },
        xaxis: {
          type: 'datetime',
		  tickPlacement:'on',
        },
        noData:{
            text: "DataLarge...Loading..."
        },
				title:{
					text:"Humidity",
				}
      },
		tempoptions: {
        chart: {
            id: 'temp',
						group :'enviroment',
            type: 'line',
            height: "100%",
			zoom: {
				type: 'x',
				enabled: true,
				autoScaleYaxis: true
			},
			toolbar: {
				autoSelected: 'zoom'
			}
          },
          colors: ['#546E7A'],
          yaxis: {
            labels: {
              minWidth: 40,
            }
          },
        xaxis: {
			type: 'datetime',
			tickPlacement:'on',
        },
        noData:{
            text: "DataLarge...Loading..."
        },
				title:{
					text:"Temperature",
				}
      },
	
      humidityseries: [
        {
          name: "humidity",
          data: [],
        }
      ],
			tempseries:[
				{
					name: "temperature",
					data: [],
				}
			]
    }
  )

	function changeDate(timeline){
		setState({
			selection: timeline
		})
		const today = new Date()
	
		switch (timeline) {
			case 'one_month':
				setState({
					humidoptions:{
						xaxis:{
							min: new Date(today.getFullYear(), today.getMonth()-1, today.getDate()).getTime(),
							max: today,
						}
					}
				})

				break;
			case 'six_months':
				setState({
					humidoptions:{
						xaxis:{
							min: new Date(today.getFullYear(), today.getMonth()-6, today.getDate()).getTime(),
							max: today,
						}
					}
				})
				break;
			case 'one_year':
				setState({
					humidoptions:{
						xaxis:{
							min: new Date(today.getFullYear()-1, today.getMonth(), today.getDate()).getTime(),
							max: today,
						}
					}
				})
				break;
			case 'ytd':
				setState({
					humidoptions:{
						xaxis:{
							min: new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).getTime(),
							max: today,
						}
					}
				})
				break;
			case 'all':
				setState({
					humidoptions:{
						xaxis:{
							min: null,
							max: null,
						}
					}
				})
				break;
			default:
		}
	}

  useEffect(() => {
		var humidityValue = [];
		var tempValue = [];
		const getdata = async () => {
			api.get(path).then(response => {
				response['results'].forEach(ele => {
					var humidity = []
					var temp = []
					var time = new Date(ele.timestamp).getTime()
					temp.push(time)
					temp.push(ele.temperature)
					humidity.push(time)
					humidity.push(ele.humidity)
					humidityValue.push(humidity)
					tempValue.push(temp)
				});
				setState({
						tempoptions: {
								...state.tempoptions,
							},
						tempseries: [
								{
									...state.tempseries,
									data: tempValue,
								}
							],
						
						humidoptions:{
							...state.humidoptions,
						},
						humidityseries:[
							{
								...state.humidityseries,
								data: humidityValue,
							}
						]
						})
			})
		};
    getdata();
  }, []);
  

  return (
    <div className="visual-wrapper">
		<div id="chart-temperature">
			<Chart
				options={state.tempoptions}
				series={state.tempseries}
				type="line"
				width="100%"
			/>
        </div>
		<div id="chart-humidity">
			<Chart
				options={state.humidoptions}
				series={state.humidityseries}
				type="line"
				width="100%"
			/>
        </div>
	    <div className="toolbar">
        	<button onClick={()=>changeDate('one_month')} id="one_month" className={ (state.selection==='one_month' ? 'active' : '')}>1M</button>
        	<button onClick={()=>changeDate('six_months')} id="six_months" className={ (state.selection==='six_months' ? 'active' : '')}>6M</button>
        	<button onClick={()=>changeDate('one_year')} id="one_year" className={ (state.selection==='one_year' ? 'active' : '')}>1Y</button>
        	<button onClick={()=>changeDate('ytd')} id="ytd" className={ (state.selection==='ytd' ? 'active' : '')}>YTD</button>
        	<button onClick={()=>changeDate('all')} id="all" className={ (state.selection==='all' ? 'active' : '')}>ALL</button>
        </div>
    </div>
  )
}

export default Visualization

