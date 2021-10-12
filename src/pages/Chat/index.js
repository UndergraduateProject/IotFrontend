import React , { useEffect, useState, useRef } from "react"
import { Row , Col } from "react-bootstrap"
import {ChatFeed, ChatBubble, Message} from 'react-chat-ui'
import Sidebar from "../../component/Sidebar"
import "./chat.css"
import user_icon from "../../images/user.png";
import Iris from "../../images/IRIS.png";
import send from "../../images/send.png"

export default function Chatbox() {
  const [message, setMessage] = useState([new Message({id:1 ,message: 'Hello World!'}), new Message({id:0 ,message: 'What is the temperature?'}), new Message({id:1 ,message: 'Temperature :31°C'}), new Message({id:0 ,message: 'Moisture?'}), new Message({id:1 ,message: 'Moisture:3%'}), new Message({id:1 ,message: 'Need water!!'}), new Message({id:0 ,message: 'Water the plant with 500ml of water'}), new Message({id:1 ,message: 'Watering with 500ml of water'})])
  const [current, setCurrent] = useState(1);
  var input = useRef();

  const onMessageSubmit = (e) => {
    const data = input
    e.preventDefault();
    if (!input.value) {
      return false;
    }
    pushMessage(0, data.value);
    setCurrent(1)
    data.value = '';
    return true;
  }

  function pushMessage(recipient, msg) {
    const newMessage = new Message({
      id: recipient,
      message : msg,
      senderName: recipient,
    });
    setMessage([...message, newMessage]);
  }
  const test = message;
  const messages = test.map((msg,id)=>{
    return(
      <Row className={"chat"+"-"+msg.id}>
        {msg.id? <img className="chat-icon" src={Iris} alt="profile_pic" />:""}
        <ChatBubble message={msg} />
        {msg.id?"":<img className="chat-icon" src={user_icon} alt="profile_pic" />}
      </Row>
    )
  })
  
  const template = (<Row className="chat">
  {/* <img className="chat-icon" src={user_icon} alt="profile_pic" /> */}
  <ChatFeed
  messages={message} // Array: list of message objects
  isTyping={false} // Boolean: is the recipient typing
  hasInputField={false} // Boolean: use our input, or use your own
  showSenderName // show the name of the user who sent the message
  bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
  // JSON: Custom bubble styles
  bubbleStyles={
    {
      text: {
        fontSize: "1rem"
      },
      chatbubble: {
        borderRadius: 70,
        padding: 10
      }
    }
  }
  />
</Row>)

  return(
    
    <div className="chatbox">
      <Sidebar />
      <Row id="title">
        <Col >IRIS</Col>
      </Row>
      {messages}
      <form id="message-form" onSubmit={onMessageSubmit}>
        <input ref={m => input = m} id="input" placeholder="Type your message..."></input>
        <img id="send-btn" onClick={onMessageSubmit} src={send}></img>
      </form>
    </div>
  )
}