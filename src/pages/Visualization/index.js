import "./visualization.css"
import React, { useState, useEffect } from "react";
import Chart from 'react-apexcharts'
import api from '../../utils/api';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from 'moment';
import Sidebar from "../../component/Sidebar";


const today = new Date();


function Visualization() {
	const [date, setDate] = useState(new Date(today.getFullYear(), today.getMonth()-3, today.getDate()).getTime())
	const [threshold, setThresh] = useState(false);
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
          colors: ['#4B83D1'],
          yaxis: {
            labels: {
              minWidth: 40
            }
          },
        xaxis: {
          type: 'datetime',
		  		tickPlacement:'on',
					min: date,
					max: today,
        },
        noData:{
            text: "DataLarge...Loading..."
        },
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
          colors: ['#FF3F7E'],
          yaxis: {
            labels: {
              minWidth: 40,
            }
          },
        xaxis: {
					type: 'datetime',
					tickPlacement:'on',
					min: date,
					max: today,
        },
        noData:{
            text: "DataLarge...Loading..."
        },
      },
      humidityseries: [
        {
          name: "humidity",
          data: []
        }
      ],
		tempseries:[
			{
				name: "temperature",
				data: []
			}
		],
		current : 0,
		selection : 'all',
		key: new Date(),
		period:"hourly",
    }
  )

	const [moisstate, setMoisstate] = useState({
		options: {
		chart: {
				id: 'moisture',
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
			colors: ['#940B00'],
			yaxis: {
				labels: {
					minWidth: 40
				}
			},
		xaxis: {
			type: 'datetime',
			tickPlacement:'on',
			min: date,
			max: today,
		},
		noData:{
				text: "DataLarge...Loading..."
		},
	},
	series: [
		{
			name: "moisture",
			data: []
		}
	],
	current : 0,
	selection : 'all',
	key: new Date(),
	period:"daily",
})
	
	const [temp, setTemp] = useState({
			"weekly" : [],
			"daily" : [],
			"hourly" : [],
	});
	const [humidity, setHumidity] = useState({
			"weekly" : [],
			"daily" : [],
			"hourly" : [],
	});
	const [moisture, setMoisture] = useState({
		"weekly" : [],
		"daily" : [],
		"hourly" : [],
	});

	
	const tempChart = <Chart
		options={state.tempoptions}
		series={state.tempseries}
		type="line"
		height="100%"
		width="100%"
	/>;

	const humidChart = <Chart
	options={state.humidoptions}
	series={state.humidityseries}
	type="line"
	width="100%"
	height="100%"
	/>;

	const moistChart = <Chart
	options={moisstate.options}
	series={moisstate.series}
	type="line"
	width="100%"
	height="100%"
	/>;
	const [chart, setChart] = useState(0)
	const [count, setCount] = useState(0)
	const [moiscount, setMoiscount] = useState(0)
	const [offset, setOffset] = useState(0)
	const [moisoff, setMoisoff] = useState(0)

	

	
  useEffect(() => {
		const path = "api/Humidtemp/?limit=1000";
		const off = "&offset=" + offset;
		const url = path + off;
		const getdata = async (url) => {
			var tempValue = {
				"weekly" :  temp.weekly,
				"daily" : temp.daily,
				"hourly" : temp.hourly,
			};
		
			var humidityValue = {
				"weekly" : humidity.weekly,
				"daily" : humidity.daily,
				"hourly" : humidity.hourly,
			};
			var tmp = {};
			var hourTmp = {};
			var weekTmp = {};
			api.get(url).then(response => {
				const tmpoff = offset + 1000;
				const resdate = new Date(response['results'][0].timestamp).getTime()
				const tmpdate = new Date(date).getTime()
				if(tmpdate > resdate){
					setDate(new Date(response['results'][0].timestamp))
				}
				setOffset(tmpoff)
				setCount(response['count'])
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
								xaxis:{
									min:date,
									max:today,
								},
								annotations:{
												yaxis: [
													{
														y: threshold.min_temp,
														y2: threshold.max_temp,
														borderColor: '#000',
														fillColor: '#FEB019',
														label: {
															text: 'threshold'
														}
													}
												]
											}
							},
						tempseries: [
								{
									...state.tempseries,
									data: tempValue.daily,
								}
							],
						
						humidoptions:{
							...state.humidoptions,
							xaxis:{
								min:date,
								max:today,
							},
							annotations:{
								yaxis: [
									{
										y: threshold.min_humid,
										y2: threshold.max_humid,
										borderColor: '#000',
										fillColor: '#FEB019',
										label: {
											text: 'threshold'
										}
									}
								]
							}
						},
						humidityseries:[
							{
								...state.humidityseries,
								data: humidityValue.daily,
							}
						],
						current : 0,
						selection : 'all',
						key: new Date(),
						period:"daily",
						})
			})
		};
		if(offset <= count){
			getdata(url);
		}
	}, [temp]);

	useEffect(() => {
		const path = "api/Moisture/?limit=20000";
		const off = "&offset=" + offset;
		const url = path;
		const getdata = async (url) => {
			var value = {
				"weekly" :  moisture.weekly,
				"daily" : moisture.daily,
				"hourly" : moisture.hourly,
			};
			var tmp = {};
			var hourTmp = {};
			var weekTmp = {};
			api.get(url).then(response => {
				console.log(response)
				const tmpoff = offset + 1000;
				const resdate = new Date(response['results'][0].timestamp).getTime()
				const tmpdate = new Date(date).getTime()
				if(tmpdate > resdate){
					setDate(new Date(response['results'][0].timestamp))
				}
				setMoisoff(tmpoff)
				setMoiscount(response['count'])
				response['results'].forEach(ele => {
					const time = new Date(ele.timestamp);
					const date = time.toISOString().split('T')[0];
					const obj = tmp[date] = tmp[date] || {count:0, moisture:0};
					const yearWeek = [moment(date).year(),moment(date).week()];
					const yearDay = [moment(date).year(),
						(moment(date).month()+1).toLocaleString('en-US',{minimumIntegerDigits:2, useGrouping:false}),
						moment(date).date().toLocaleString('en-US',{minimumIntegerDigits:2, useGrouping:false}),
						moment(time).hour().toLocaleString('en-US',{minimumIntegerDigits:2, useGrouping:false})];
					const hourObj = hourTmp[yearDay] = hourTmp[yearDay] || {count:0, moisture:0};
					const weekObj = weekTmp[yearWeek] = weekTmp[yearWeek] || {count:0, moisture:0};
					obj.count++;
					obj.moisture += ele.moisture;
					hourObj.count++;
					hourObj.moisture += ele.moisture;
					weekObj.count++;
					weekObj.moisture += ele.moisture;
				});
	
				const res = Object.entries(tmp).map(function(entry){
					return { date: entry[0], moistAvg: (entry[1].moisture/entry[1].count).toFixed(2)}
				});
				const hourlyRes = Object.entries(hourTmp).map(function(entry){
				entry[0] = entry[0].replace(',','-');
				entry[0] = entry[0].replace(',','-');
				entry[0] = entry[0].replace(',','T');
				entry[0] = moment(entry[0]);
				// entry[0] = new Date(entry[0]).getTime();
				return { date: entry[0], moistAvg: (entry[1].moisture/entry[1].count).toFixed(2)}
				});
	
				const weekRes = Object.entries(weekTmp).map(function(entry){
					entry[0] = entry[0].replace(',','W');
					entry[0] = moment(entry[0]);
					return { date: entry[0], moistAvg: (entry[1].moisture/entry[1].count).toFixed(2)}
				});
	
	
				weekRes.forEach(ele=>{
					var moisture = [];
					moisture.push(ele.date);
					moisture.push(ele.moistAvg);
					value.weekly.push(moisture);
				})
				
				res.forEach(ele=>{
					var moisture = [];
					moisture.push(ele.date);
					moisture.push(ele.moistAvg);
					value.daily.push(moisture);
				})
					
				hourlyRes.forEach(ele=>{
					var moisture = [];
					moisture.push(ele.date);
					moisture.push(ele.moistAvg);
					value.hourly.push(moisture);
				})
				setMoisture(value)	
				setMoisstate({
						options: {
								...moisstate.options,
								xaxis:{
									min:date,
									max:today,
								},
							},
						series: [
								{
									...moisstate.series,
									data: value.daily,
								}
							],
							current : 0,
							selection : 'all',
							key: new Date(),
							period:"daily",
						})
			})
		};
		getdata(url)
	},[]);

	//plant
  useEffect(()=>{
    const url = "api/Usertoplant/";
    api.get(url)
    .then(res => {
      const url = "api/Plant/"+ res['results'][0].plant + "/"
      api.get(url)
      .then(res =>{
        console.log(res)
				const tmp = {
					max_temp : res.max_temp,
					min_temp : res.min_temp,
					max_humid : res.max_humidity,
					min_humid : res.min_humidity,
				}
				setThresh(tmp)
      })
    })
  },[])

  const changePeriod = (period) => {
	switch (period){
		case "weekly" :
			setState({
				...state,
				period: period,
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
			setMoisstate({
				...state,
				period: period,
				options:{
					...moisstate.options
				},
				series:[
					{
						data: moisture.weekly
					}
				]
			})
			break;
		
		case "daily":
			setState({
				...state,
				period: period,
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
			setMoisstate({
				...state,
				period: period,
				options:{
					...moisstate.options
				},
				series:[
					{
						data: moisture.daily
					}
				]
			})
			break;

		case "hourly":
			setState({
				...state,
				period: period,
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
			setMoisstate({
				...state,
				period: period,
				options:{
					...moisstate.options
				},
				series:[
					{
						data: moisture.hourly
					}
				]
			})
			break;

		default :
			setState({
				...state,
				period: period,
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
			setMoisstate({
				...state,
				period: period,
				options:{
					...moisstate.options
				},
				series:[
					{
						data: moisture.daily
					}
				]
			})
			break;
	}
  }

	const changechart = (e) => {
		switch (e.target.value){
			case "0":
				setChart(0)
				setState({
					...state,
					current :0
				})
				break;
			
			case "1":
				setChart(1)
				setState({
					...state,
					current :1
				})
				break;
			
			case "2":
				setChart(2)
				setState({
					...state,
					current :2
				})
				break;
			
			default :
				setChart(0)
				setState({
					...state,
					current :0
				})
				break;
		}
	}

  function changeDate(timeline){
	switch (timeline) {
		case 'one_month':
			setState({
				...state,
				humidoptions:{
					...state.humidoptions,
					xaxis:{
						min: new Date(today.getFullYear(), today.getMonth()-1, today.getDate()).getTime(),
						max: today,
					}
				},
				tempoptions:{
					...state.tempoptions,
					xaxis:{
						min: new Date(today.getFullYear(), today.getMonth()-1, today.getDate()).getTime(),
						max: today,
					}
				},
			selection: timeline,
			})
			setMoisstate({
				...state,
				options:{
					...moisstate.options,
					xaxis:{
						min: new Date(today.getFullYear(), today.getMonth()-1, today.getDate()).getTime(),
						max: today,
					}
				},
				selection: timeline,
			})
			break;
		case 'six_months':
			setState({
				...state,
				humidoptions:{
					...state.humidoptions,
					xaxis:{
						min: new Date(today.getFullYear(), today.getMonth()-6, today.getDate()).getTime(),
						max: today,
					}
				},
				tempoptions:{
					...state.tempoptions,
					xaxis:{
						min: new Date(today.getFullYear(), today.getMonth()-6, today.getDate()).getTime(),
						max: today,
					}
				},
				selection: timeline,
			})
			setMoisstate({
				...state,
				options:{
					...moisstate.options,
					xaxis:{
						min: new Date(today.getFullYear(), today.getMonth()-6, today.getDate()).getTime(),
						max: today,
					}
				},
				selection: timeline,
			})
			break;
		case 'one_year':
			setState({
				...state,
				humidoptions:{
					...state.humidoptions,
					xaxis:{
						min: new Date(today.getFullYear()-1, today.getMonth(), today.getDate()).getTime(),
						max: today,
					}
				},
				tempoptions:{
					...state.tempoptions,
					xaxis:{
						min: new Date(today.getFullYear()-1, today.getMonth(), today.getDate()).getTime(),
						max: today,
					}
				},
				selection: timeline,
			})
			setMoisstate({
				...state,
				options:{
					...moisstate.options,
					xaxis:{
						min: new Date(today.getFullYear()-1, today.getMonth(), today.getDate()).getTime(),
						max: today,
					}
				},
				selection: timeline,
			})
			break;
		case 'ytd':
			setState({
				...state,
				humidoptions:{
					...state.humidoptions,
					xaxis:{
						min: new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).getTime(),
						max: today,
					}
				},
				tempoptions:{
					...state.tempoptions,
					xaxis:{
						min: new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).getTime(),
						max: today,
					}
				},
				selection: timeline,
			})
			setMoisstate({
				...state,
				options:{
					...moisstate.options,
					xaxis:{
						min: new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).getTime(),
						max: today,
					}
				},
				selection: timeline,
			})
			break;
		case 'all':
			setState({
				...state,
				humidoptions:{
					...state.humidoptions,
					xaxis:{
						min: date,
						max: today,
					}
				},
				tempoptions:{
					...state.tempoptions,
					xaxis:{
						min: date,
						max: today,
					}
				},
				selection: timeline,
			})
			setMoisstate({
				...state,
				options:{
					...moisstate.options,
					xaxis:{
						min: date,
						max: today,
					}
				},
				selection: timeline,
			})
			break;
		default:
			setState({
				...state,
				humidoptions:{
					...state.humidoptions,
					xaxis:{
						min: date,
						max: today,
					}
				},
				tempoptions:{
					...state.tempoptions,
					xaxis:{
						min: date,
						max: today,
					}
				},
				selection: timeline,
			})
			setMoisstate({
				...state,
				options:{
					...moisstate.options,
					xaxis:{
						min: date,
						max: today,
					}
				},
				selection: timeline,
			})
	}
}

  return (
    <div className="visual-wrapper">
		<Sidebar />
		<div className="select-custom">
		<select onChange={changechart}>
			<option value="0">溫度</option>
			<option value="1">空氣濕度</option>
			<option value="2">土壤濕度</option>
		</select>
		</div>
		<div className="toolbar">
        	<div><button onClick={()=>changeDate('ytd')} id="ytd" className={ (state.selection=='ytd' ? 'active' : '')}>YTD</button></div>
        	<div><button onClick={()=>changeDate('one_month')} id="one_month" className={ (state.selection=='one_month' ? 'active' : '')}>1M</button></div>
        	<div><button onClick={()=>changeDate('six_months')} id="six_months" className={ (state.selection=='six_months' ? 'active' : '')}>6M</button></div>
        	<div><button onClick={()=>changeDate('one_year')} id="one_year" className={ (state.selection=='one_year' ? 'active' : '')}>1Y</button></div>
        	<div><button onClick={()=>changeDate('all')} id="all" className={ (state.selection=='all' ? 'active' : '')}>ALL</button></div>
        </div>
		<div id="chart">
			{(()=>{
				switch(chart){
					case 0:
						return(tempChart);
					
					case 1:
						return(humidChart);
					
					case 2:
						return(moistChart);

					default:
						return(tempChart);
				}
			})()}
    </div>
		
		<div className="toolbar">
			<div><button onClick={()=>changePeriod("weekly")} className={state.period=='weekly' ? 'active' : ''}>每星期</button></div>
			<div><button onClick={()=>changePeriod("daily")} className={state.period=='daily' ? 'active' : ''}>每天</button></div>
			<div><button onClick={()=>changePeriod("hourly")} className={state.period=='hourly' ? 'active' : ''}>每小時</button></div>
		</div>
    </div>
  )
}

export default Visualization;

