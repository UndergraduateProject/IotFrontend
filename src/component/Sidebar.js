import {useState} from "react";
import {useSpring, animated} from "react-spring";
import user_icon from '../images/user.png';
import "./sidebar.css"

function Sidebar(){
    const [isActive, setActive] = useState(false)
    
    const toggle = () =>{
        setActive(!isActive)
        console.log(isActive)
    }
    
    const show = useSpring({
        left: isActive ? "0": "-60%",
    });


    return(
        <animated.div id="sidebar" style={show}>
            <div className="toggle-btn" onClick={toggle}>{/* Menu icon  */}
                <span></span>
                <span></span>
                <span></span> 
            </div>
            <div className="user">
            <div><img src={user_icon}/></div>
            <div className="user-text">User</div>
            </div>
            <div className="menu">
            <ul>
                <li>首頁</li>
                <li>選擇植物</li>
                <li>監控數據</li>
                <li>調控物件</li>
                <li>分析結果</li>
            </ul>
            </div>
            <div className="setting">
                設定
            </div>
      </animated.div>
    )
}

export default Sidebar;