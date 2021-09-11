import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./setting.css"
import {withStyles } from "@material-ui/core/styles"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import Sidebar from "../../component/Sidebar"
import { Link } from "react-router-dom"

// should npm install @material-ui/styles


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

export default function Setting() {
 
  // switch
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  })

  const handleChange_switch = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }
  // switch

  return (
    <div className="body_setting">
      <Sidebar />
      {/* block1 */}
      <div className="top_block1">設定</div>
      <div className="top_block2">
        

        <div className="text_left">
          開啟通知
        </div>
         {/* switch */}
        <FormGroup className="switch_position_setting">
          <FormControlLabel
            control={
              <IOSSwitch
                checked={state.checkedA}
                onClick={handleChange_switch}
                name="checkedA"
              />
            }
            //  label="On"
          />
        </FormGroup>
        {/* switch */}
      </div>
      {/* block1 */}


      {/* <div className="top_block2">
        <div className="text_left">
          開啟音效
        </div>
        <FormGroup className="switch_position_setting">
          <FormControlLabel
            control={
              <IOSSwitch
                checked={state.checkedB}
                onChange={handleChange_switch}
                name="checkedB"
              />
            }
          />
        </FormGroup>
      </div> */}


      {/* <div className="top_block2">
        <div className="text_left">
          自動上傳資料
        </div>
        <FormGroup className="switch_position_setting">
          <FormControlLabel
            control={
              <IOSSwitch
                checked={state.checkedC}
                onChange={handleChange_switch}
                name="checkedC"
              />
            }
          />
        </FormGroup>
      </div> */}


      {/* block4 */}
      <div className="top_block2">
        <div className="text_left">
        <Link to="/">
          常見問題與支援
        </Link>
        </div>
      </div>
      {/* block4 */}     


      {/* block5 */}
      <div className="top_block2">
        <div className="text_left">
        <Link to="/">
          隱私權政策
        </Link>
        </div>
      </div>
      {/* block5 */}       


      {/* block6 */}
      <div className="top_block2">
        <div className="text_left">
        <Link to="/">
          聯絡我們
        </Link>
        </div>
      </div>
      {/* block6 */}       



    </div>
  )
}