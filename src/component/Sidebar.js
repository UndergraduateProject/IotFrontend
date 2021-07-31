import { slide as Menu } from 'react-burger-menu'  /* should npm install react-burger-menu --save*/
import "./sidebar.css"
import { Link } from "react-router-dom"
import user_icon from "../images/user.png"

function Sidebar() {
  return (
    <Menu width={ '260px' }>
      <div className="user">
        <div>
          <img  className="user_pic" src={user_icon} alt="" />
        </div>
        <div className="user-text">User</div>
      </div>

      <Link to="/homepage">
        <div className="menu-item" >首頁</div>
      </Link>

      <Link to="select">
        <div className="menu-item" >選擇植物</div>
      </Link>

      <Link to="/monitor">
        <div className="menu-item" >監控數據</div>
      </Link>

      <Link to="/control">
        <div className="menu-item" >調控物件</div>
      </Link>

      <Link to="">
        <div className="menu-item" >分析結果</div>
      </Link>

      <div className="setting"> 
        <Link to="/setting">
          <div className="menu-item" >設定</div>
        </Link>
      </div>
    </Menu>
    )
  }
export default Sidebar