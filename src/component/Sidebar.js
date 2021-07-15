import {useEffect, useState} from "react";
import {useSpring, animated} from "react-spring";
import user_icon from '../images/user.png';
import "./sidebar.css"
import {Link} from "react-router-dom"

function Sidebar(){
    const [isActive, setActive] = useState(false)
    
    const toggle = () =>{
        setActive(!isActive)
        console.log(isActive)
    }
    
    const show = useSpring({
        left: isActive ? "0": "-60%",
    });

    useEffect(()=>{
        document.addEventListener('click',(event)=>{
            const target = event.target;
            if(!(target).closest("#sidebar") && isActive){
                setActive(false)
            }
        })
    })


    return(
        <animated.div id="sidebar" style={show}>
            <div className="toggle-btn" onClick={toggle}>{/* Menu icon  */}
                <span></span>
                <span></span>
                <span></span> 
            </div>
            <div className="user">
            <div><img src={user_icon}  alt=""/></div>
            <div className="user-text">User</div>
            </div>
            <div className="menu">
            <ul>
                <Link to="/homepage"><li>首頁</li></Link>
                <Link to="/select"><li>選擇植物</li></Link>
                <Link to="/monitor"><li>監控數據</li></Link>
                <Link to="/control"><li>調控物件</li></Link>
                <Link to=""><li>分析結果</li></Link>                
            </ul>
            </div>
            <Link to="/"><div className="setting">設定</div></Link>
      </animated.div>
    )
}

export default Sidebar;