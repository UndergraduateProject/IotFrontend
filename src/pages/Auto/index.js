import React, {useState, useEffect} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {Button} from 'react-bootstrap';
import "./automation.css"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import Sidebar from "../../component/Sidebar"
import TextField from '@material-ui/core/TextField';
import api from '../../utils/api';

// should npm install @material-ui/styles

// select
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))
//select

// switch
const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  )
})
//switch

export default function Warning_ct() {
  //select
  const classes = useStyles()
  const [data, setData] = useState({
    "moisture": 0,
    "humidity":0,
    "temperature": 0,
    "brightness": 0,
  })

  const [hiLo, setHiLo] = useState ({
    "humidity" : "higher",
    "moisture" : "higher",
    "temperature" : "lower",
    "brightness" : "lower"
  })

  //select
  const handleChange = (event) => {
    console.log(event.target.name)
    setHiLo({...hiLo, [event.target.name] : event.target.value})
  }

  const setCondition = (e) =>{
    setData({...data, [e.target.name]:e.target.value});
  }

  // switch
  const [state, setState] = useState({
    humidity: false,
    moisture: false,
    temperature: false,
    brightness: false,
  })


  const handleChange_switch = (event,value) => {
    console.log(value)
    if(value){
      switch(event.target.name){
        case "humidity":
          if(value >0 && value <=100){
            setState({ ...state, [event.target.name]: event.target.checked })
            //post data
          }
          else{
            alert("Humidity value not valid.")
          }
          break;

        case "moisture":
          if(value >0 && value <=100){
            setState({ ...state, [event.target.name]: event.target.checked })
            //post data
          }
          else{
            alert("Moisture value not valid.")
          }
          break;

        case "temperature":
          if(value >0 && value <=50){
            setState({ ...state, [event.target.name]: event.target.checked })
            //post data
          }
          else{
            alert("Temperature value not valid.")
          }
          break;

        case "brightness":
          if(value >0 && value <=100){
            setState({ ...state, [event.target.name]: event.target.checked })
            //post data
          }
          else{
            alert("Brightness value not valid.")
          }
          break;

        default:
          alert("System error!!!")
          break;

      }
    }
    else{
      alert("value can't be none")
    }  
  }
  // switch

  //updata changes
  //update changes
  const saveChanges = () => {
    const url = "api/ActionCondition/";
    let id = 1;
    for (const [key, value] of Object.entries(data)) {
      const patch = url + id + "/";
      let operator = ">";
      let status = "ON";
      if (hiLo[key] == "lower") {
        operator = "<"
      }
      if (!state[key]) {
        status = "OFF";
      }
      console.log(hiLo[key])
      const data = {};
      data[key] = value;
      data["operator"] = operator;
      data["status"] = status;
      api.patch(patch, data)
        .then(res => {
          console.log(res)
        })
      id += 1;
    }
    alert("Saved")
  }

  //get condition
  useEffect(()=>{
    const url = "api/ActionCondition/"
    api.get(url)
      .then(res => {
        var temp = {};
        var hilotemp = {};
        var statustemp = {};
        res.results.forEach(ele => {
          for (const [key, value] of Object.entries(ele)) {
            if (key in data) {
              var operator = "higher"
              var status = true;
              if (ele.operator == "<") {
                operator = "lower"
              }
              if (ele.status == "OFF") {
                status = false;
              }
              switch (key) {
                case "humidity":
                  if (value != -1) {
                    temp.humidity = value;
                    hilotemp.humidity = operator;
                    statustemp.humidity = status;
                  }
                  break;

                case "temperature":
                  if (value != -1) {
                    temp.temperature = value;
                    hilotemp.temperature = operator;
                    statustemp.temperature = status;
                  }
                  break;

                case "moisture":
                  if (value != -1) {
                    temp.moisture = value;
                    hilotemp.moisture = operator;
                    statustemp.moisture = status;
                  }
                  break;
                
                case "brightness":
                  if (value != -1) {
                    temp.brightness = value;
                    hilotemp.brightness = operator;
                    statustemp.brightness = status;
                  }

                default:
                  break;
              }
            }
          }
        })
        console.log(temp)
        setState(statustemp)
        setHiLo(hilotemp)
        setData(temp)
      })
  }, [])

  return (
    // block1
    <div className="body_wc">
      <Sidebar />
      <div className="top_block1_ct">Automation</div>
      <div className="top_block2_ct">
        <div className="text_left_ct">
          Water Plants if <b style={{color:"blue"}}> humidity </b> is <div className="at_space"></div>
          {/* select */}
          <FormControl className={classes.formControl}>
            <Select
              value={hiLo.humidity}
              onChange={handleChange}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}
              name="humidity"
            >
              <MenuItem value="lower">
                <em className="select_text">lower</em>
              </MenuItem>
              <MenuItem value="higher">
                <div className="select_text">higher</div>
              </MenuItem>
            </Select>
            {/* <FormHelperText>Without label</FormHelperText> */}
          </FormControl>
          {/* select */}
          than {' '}
          <input className="temp_wc" name="humidity" type="text" onChange={setCondition} value={data.humidity}></input>
          {' '}%
        </div>
      
        {/* switch */}
        <FormGroup className="switch_position">
          <FormControlLabel
            control={
              <IOSSwitch
                checked={state.humidity}
                onChange={(e)=>handleChange_switch(e, data.humidity)}
                name="humidity"
              />
            }
            // label="iOS style"
          />
        </FormGroup>
        {/* switch */}
      </div>
      {/* block1 */}

      <div className="top_block2_ct">
        <div className="text_left_ct">
          Water Plants if <b style={{color:"brown"}}> moisture </b> is <div className="at_space"></div>
          {/* select */}
          <FormControl className={classes.formControl}>
            <div className="select_text">lower</div>
            {/* <FormHelperText>Without label</FormHelperText> */}
          </FormControl>
          {/* select */}
          than {' '}
          <input className="temp_wc" name="moisture" type="text" onChange={setCondition} value={data.moisture}></input>
          {' '}%
        </div>
      
        {/* switch */}
        <FormGroup className="switch_position">
          <FormControlLabel
            control={
              <IOSSwitch
                checked={state.moisture}
                onChange={(e)=>handleChange_switch(e, data.moisture)}
                name="moisture"
              />
            }
            // label="iOS style"
          />
        </FormGroup>
        {/* switch */}
      </div>

      {/* block2 */}
      <div className="top_block2_ct">
        <div className="text_left_ct">
          Open fan if <b style={{color:"red"}}> temperature </b> is <div className="at_space"></div>
          {/* select */}
          <FormControl className={classes.formControl}>
            <Select
              value={hiLo.temperature}
              onChange={handleChange}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}
              name="temperature"
            >
              <MenuItem value="lower">
                <em className="select_text">lower</em>
              </MenuItem>
              <MenuItem value="higher">
                <div className="select_text">higher</div>
              </MenuItem>
            </Select>
            {/* <FormHelperText>Without label</FormHelperText> */}
          </FormControl>
          {/* select */}
          than {' '}
          <input className="temp_wc" name="temperature" type="text" onChange={setCondition} value={data.temperature}></input>
          {' '}°C
        </div>
  
        {/* switch */}
        <FormGroup className="switch_position">
          <FormControlLabel
            control={
              <IOSSwitch
                checked={state.temperature}
                onChange={(e)=>handleChange_switch(e, data.temperature)}
                name="temperature"
              />
            }
            // label="iOS style"
          />
        </FormGroup>
        {/* switch */}
      </div>
      {/* block2 */}

      {/* block3 */}
      <Button onClick={saveChanges} className="at_btn" size="lg" variant="light">Save Changes</Button>
    </div>
    
  )
}