 import React, {useState, useEffect} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./warning_ct.css"
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
    "humidity": 0,
    "temperature": 0,
    "volume": 0,
  })

  const [hiLo, setHiLo] = useState ({
    "humidity" : "higher",
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
    temperature: false,
    volume: false,
  })


  const handleChange_switch = (event,value) => {
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

        case "temperature":
          if(value >0 && value <=50){
            setState({ ...state, [event.target.name]: event.target.checked })
            //post data
          }
          else{
            alert("Temperture value not valid.")
          }
          break;

        case "volume":
          if(value >0 && value <=1000){
            setState({ ...state, [event.target.name]: event.target.checked })
            //post data
          }
          else{
            alert("Volume value not valid.")
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

  //get condition
  useEffect(()=>{
    const url= "api/WarningCondition/";
    api.get(url)
    .then(res => {
      console.log(res.results)
      var temp = {};
      var hilotemp = {};
      var statustemp = {};
      res.results.forEach(ele =>{
        console.log(ele)
        for (const [key,value] of Object.entries(ele)){
          if (key in data) {
              var operator = "higher"
              var status = true;
            if(ele.operator == "<"){
              operator = "lower"
            }
            if(ele.status == "OFF"){
              status = false;
            } 
            switch(key){
              case "humidity":
                if(value != -1){
                  temp.humidity= value;
                  hilotemp.humidity = operator;
                  statustemp.humidity = status;
                }
                break;

              case "temperature":
                if(value != -1){
                  temp.temperature = value;
                  hilotemp.temperature = operator;
                  statustemp.temperature = status;
                }
                break;

              case "volume":
                if(value != -1){
                  temp.volume = value;
                  hilotemp.volume = operator;
                  statustemp.volume = status;
                }
                break;

              default:
                break;
            }
          }
        }
      })
      setState(statustemp)
      setHiLo(hilotemp)
      setData(temp)
    })
  },[])

  return (
    // block1
    <div className="body_wc">
      <Sidebar />
      <div className="top_block1_ct">Warning Center</div>
      <div className="top_block2_ct">
        <div className="text_left_ct">
          Notify me if humidity is
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

      {/* block2 */}
      <div className="top_block2_ct">
        <div className="text_left_ct">
          Notify me if temperature is
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
          <input className="temp_wc" name="temperature" type="text" onChange={setCondition} value={data.temperature} ></input>
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
      <div className="top_block2_ct">
        <div className="text_left_ct">
          Notify me if volume is
          {/* select */}
          <FormControl className={classes.formControl}>
            <Select
              value={hiLo.brightness}
              onChange={handleChange}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}
              name="brightness"
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
          <input className="temp_wc" name="volume" type="text" onChange={setCondition} value={data.volume}></input>
          {' '}%
        </div>

        {/* switch */}
        <FormGroup className="switch_position">
          <FormControlLabel
            control={
              <IOSSwitch
                checked={state.volume}
                onChange={(e)=>handleChange_switch(e, data.volume)}
                name="volume"
              />
            }
            // label="iOS style"
          />
        </FormGroup>
        {/* switch */}
      </div>
      {/* block3 */}
    </div>
  )
}