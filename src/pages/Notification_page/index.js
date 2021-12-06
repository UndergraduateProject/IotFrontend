import React, {useState, useEffect} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {Button} from 'react-bootstrap';
import Sidebar from "../../component/Sidebar"
import "./notification_page.css";
import api from "../../utils/api"

export default function Notification_page() {
  const [msg, setMsg] = useState([])
  const [count, setCount] = useState()

  useEffect(()=>{
    const url = "api/WarningRecord/";
    api.get(url)
    .then(res =>{
      setMsg(res.results)
      setCount(res.results[0].id)
    })
  },[])

  const delete_msg = () => {
    const url = "api/WarningRecord/";
    console.log('deleting')

    for(var i = count;i>0;i--){
      const url2 = url + i + '/';
      console.log(i)
      api.remove(url2)
      .then(res =>{
        console.log(res)
        if(res.detail){
          i = 0
        }
      })
    }
  }

  const history = msg.map((ele, index)=>{
    if(ele.title.toLowerCase() == 'warning'){
      return (<div className="noti_block_wc" key={index}>
      <div className="noti_topic">Warning</div>
      <div className="noti_hr">{ele.timestamp}</div>
      <div className="noti_content">{ele.body} </div>
    </div>)
    }
    else{
      return(
        <div className="Auto_block" key={index}>
        <div className="Auto_topic">Automation</div>
        <div className="Auto_hr">{ele.timestamp}</div>
        <div className="Auto_content">{ele.body} </div>
      </div> 
      )
    }
  })

    return (
      <div className="body_noti">
        <Sidebar />
        <div className="top_block1_noti">通知</div>

        <div className="warning_container">{history}</div>

        <Button className="noti_btn" size="lg" variant="light" onClick={delete_msg}>清除所有通知</Button>
      </div>
    )
  }