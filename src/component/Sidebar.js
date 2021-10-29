import { slide as Menu } from 'react-burger-menu'  /* should npm install react-burger-menu --save*/
import "./sidebar.css"
import { Link } from "react-router-dom"
import user_icon from "../images/user.png"

function Sidebar() {
  const username = localStorage.getItem('username');
  return (
    <Menu width={ '260px' }>
      <Link to="/profile">
        <div className="user" >
          <div>
            <img  className="user_pic" src={user_icon} alt="" />
          </div>
          <div className="user-text">{username}</div>
        </div>
      </Link>

      <Link to="/homepage">
        <div className="menu-item" >首頁</div>
      </Link>

      <Link to="/monitor">
        <div className="menu-item" >監控數據</div>
      </Link>

      <Link to="/control">
        <div className="menu-item" >調控物件</div>
      </Link>

      <Link to="/visualization">
        <div className="menu-item" >資料視覺化</div>
      </Link>

      <Link to="/detect">
        <div className="menu-item" >分析結果</div>
      </Link>

      <Link to="/chat">
        <div className="menu-item" >聊天機器人</div>
      </Link>

      <Link to="/warning_center">
        <div className="menu-item">警示設定</div>
      </Link>

      <Link to="/auto">
        <div className="menu-item" >自動運作設定</div>
      </Link>

      <Link to="/notification_page">
        <div className="menu-item">通知</div>
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