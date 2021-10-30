import React, {useState, useEffect} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {Button} from 'react-bootstrap';
import Sidebar from "../../component/Sidebar"
import "./notification_page.css";

export default function Notification_page() {
    return (
      <div className="body_noti">
        <Sidebar />
        <div className="top_block1_noti">Notification</div>

        <div className="noti_block_wc">
          <div className="noti_topic">Warning !</div>
          <div className="noti_hr">15hr ago</div>
          <div className="noti_content">Temperature is over 30°C </div>
        </div>

        <div className="Auto_block">
          <div className="Auto_topic">Automation</div>
          <div className="Auto_hr">Sun, 11:35</div>
          <div className="Auto_content">Fan has opened </div>
        </div>



          
        <Button className="noti_btn" size="lg" variant="light">Clean all notifications</Button>
      </div>
    )
  }