import "./visualization.css"
import React, { useState, useEffect } from "react";
import Chart from 'react-apexcharts'
import api from '../../utils/api';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from 'moment';


const path = "api/Humidtemp/?limit=9999999";



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
	
	const [temp, setTemp] = useState({});
	const [humidity, setHumidity] = useState({});

  useEffect(() => {
	var tempValue = {
		"weekly" : [],
		"daily" : [],
		"hourly" : [],
	};

	var humidityValue = {
		"weekly" : [],
		"daily" : [],
		"hourly" : [],
	};
		var tmp = {};
		var hourTmp = {};
		var weekTmp = {};
		const getdata = async () => {
			api.get(path).then(response => {
				response['results'].forEach(ele => {
					const time = new Date(ele.timestamp);
					const date = time.toISOString().split('T')[0];
					const obj = tmp[date] = tmp[date] || {count:0, temperature:0, humidity:0};
					const yearWeek = [moment(date).year(),moment(date).week()];
					const yearDay = [moment(date).year(),
						(moment(date).month()+1).toLocaleString('en-US',{minimumIntegerDigits:2, useGrouping:false}),
						moment(date).date().toLocaleString('en-US',{minimumIntegerDigits:2, useGrouping:false}),
						moment(time).hour().toLocaleString('en-US',{minimumIntegerDigits:2, useGrouping:false})];
					const hourObj = hourTmp[yearDay] = hourTmp[yearDay] || {count:0, temperature:0,humidity:0};
					const weekObj = weekTmp[yearWeek] = weekTmp[yearWeek] || {count:0, temperature:0, humidity:0};
					obj.count++;
					obj.temperature += ele.temperature;
					obj.humidity += ele.humidity;
					hourObj.count++;
					hourObj.temperature += ele.temperature;
					hourObj.humidity += ele.humidity;
					weekObj.count++;
					weekObj.temperature += ele.temperature;
					weekObj.humidity += ele.humidity;
				});
				
				const res = Object.entries(tmp).map(function(entry){
					return { date: entry[0], tempAvg: (entry[1].temperature/entry[1].count).toFixed(2), humidAvg: (entry[1].humidity/entry[1].count).toFixed(2)}
				});

				const hourlyRes = Object.entries(hourTmp).map(function(entry){
					entry[0] = entry[0].replace(',','-');
					entry[0] = entry[0].replace(',','-');
					entry[0] = entry[0].replace(',','T');
					entry[0] = moment(entry[0]);
					// entry[0] = new Date(entry[0]).getTime();
					return { date: entry[0], tempAvg: (entry[1].temperature/entry[1].count).toFixed(2), humidAvg: (entry[1].humidity/entry[1].count).toFixed(2)}
				});

				const weekRes = Object.entries(weekTmp).map(function(entry){
					entry[0] = entry[0].replace(',','W');
					entry[0] = moment(entry[0]);
					return { date: entry[0], tempAvg: (entry[1].temperature/entry[1].count).toFixed(2), humidAvg: (entry[1].humidity/entry[1].count).toFixed(2)}
				});


				weekRes.forEach(ele=>{
					var temp = [];
					var humidity = [];
					humidity.push(ele.date);
					humidity.push(ele.humidAvg);
					temp.push(ele.date);
					temp.push(ele.tempAvg);
					tempValue.weekly.push(temp);
					humidityValue.weekly.push(humidity)
				})
				
				res.forEach(ele=>{
					var temp = [];
					var humidity = [];
					humidity.push(ele.date);
					humidity.push(ele.humidAvg);
					temp.push(ele.date);
					temp.push(ele.tempAvg);
					tempValue.daily.push(temp);
					humidityValue.daily.push(humidity)
				})

				
				hourlyRes.forEach(ele=>{
					var temp = [];
					var humidity = [];
					humidity.push(ele.date);
					humidity.push(ele.humidAvg);
					temp.push(ele.date);
					temp.push(ele.tempAvg);
					tempValue.hourly.push(temp);
					humidityValue.hourly.push(humidity)
				})
				
				setTemp(tempValue);
				setHumidity(humidityValue);
				setState({
						tempoptions: {
								...state.tempoptions,
							},
						tempseries: [
								{
									...state.tempseries,
									data: tempValue.daily,
								}
							],
						
						humidoptions:{
							...state.humidoptions,
						},
						humidityseries:[
							{
								...state.humidityseries,
								data: humidityValue.daily,
							}
						]
						})
			})
		};
    getdata();
  }, []);


  const changePeriod = (period) => {
	switch (period){
		case "weekly" :
			setState({
				tempoptions: {
					...state.tempoptions,
				},
				tempseries: [
						{
							data: temp.weekly,
						}
					],
				humidoptions:{
					...state.humidoptions,
				},
				humidityseries:[
					{
						data: humidity.weekly,
					}
				]
			})
			break;
		
		case "daily":
			setState({
				tempoptions: {
					...state.tempoptions,
				},
				tempseries: [
						{
							data: temp.daily,
						}
					],
				humidoptions:{
					...state.humidoptions,
				},
				humidityseries:[
					{
						data: humidity.daily,
					}
				]
			})
			break;

		case "hourly":
			setState({
				tempoptions: {
					...state.tempoptions,
				},
				tempseries: [
						{
							data: temp.hourly,
						}
					],
				humidoptions:{
					...state.humidoptions,
				},
				humidityseries:[
					{
						data: humidity.hourly,
					}
				]
			})
			break;

		default :
			setState({
				tempoptions: {
					...state.tempoptions,
				},
				tempseries: [
						{
							data: temp.daily,
						}
					],
				humidoptions:{
					...state.humidoptions,
				},
				humidityseries:[
					{
						data: humidity.daily,
					}
				]
			})
			break;
	}
  }

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
        	<div><button onClick={()=>changeDate('one_month')} id="one_month" className={ (state.selection==='one_month' ? 'active' : '')}>1M</button></div>
        	<div><button onClick={()=>changeDate('six_months')} id="six_months" className={ (state.selection==='six_months' ? 'active' : '')}>6M</button></div>
        	<div><button onClick={()=>changeDate('one_year')} id="one_year" className={ (state.selection==='one_year' ? 'active' : '')}>1Y</button></div>
        	<div><button onClick={()=>changeDate('ytd')} id="ytd" className={ (state.selection==='ytd' ? 'active' : '')}>YTD</button></div>
        	<div><button onClick={()=>changeDate('all')} id="all" className={ (state.selection==='all' ? 'active' : '')}>ALL</button></div>
        </div>
		<div className="toolbar">
			<div><button onClick={()=>changePeriod("weekly")}>Weekly</button></div>
			<div><button onClick={()=>changePeriod("daily")}>Daily</button></div>
			<div><button onClick={()=>changePeriod("hourly")}>Hourly</button></div>
		</div>
    </div>
  )
}

export default Visualization

