import React from "react";
import "./profile.css";
import user_icon from "../../images/user.png";
import tree_icon from "../../images/tree_icon.png";
import leaf_icon from "../../images/leaf_icon.png";
import Icon from '@material-ui/core/Icon';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Sidebar from "../../component/Sidebar";
import api from "../../utils/api";

function Profile() {
    const username = localStorage.getItem('username');
    const logout = () =>{
        api.post("user/logout/",{}).then(res => {
          console.log(res);
          localStorage.clear();
          window.location.href = "/";
        })
    }
    return (
        <div className="profile_body">
            <Sidebar />
            <div className="top_block1_profile">帳戶</div>
            <div className="background_profile">
                <img  className="user_pic_profile" src={user_icon}  />
                <CameraAltIcon color="secondary" fontSize="large" className="camera_pic"/>
                <div className="user_account_profile">{username} </div>
                <div className="user_email_profile">User123@gmail.com</div>
                <div className="tree">
                <img  className="tree_pic_profile" src={tree_icon}  /><div className="tree_detail">246</div>
                </div>
                <div className="leaf">
                <img  className="leaf_pic_profile" src={leaf_icon}  /><div className="leaf_detail">92%</div>
                </div>
            <div className="block_bottom_1">
                <div className="text_profile">變更帳號/密碼</div>
            </div>

            <div className="block_bottom_1">
                <div className="text_profile">清除資料</div>
            </div>

            <div className="block_bottom_1">
                <button className="logout_profile" onClick={logout}>登出</button>
            </div>


            </div>
            
        </div>

    )
}

    
export default Profile;