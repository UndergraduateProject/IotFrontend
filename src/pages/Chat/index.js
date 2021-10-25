import React , { useEffect, useState, useRef } from "react"
import { Row , Col } from "react-bootstrap"
import {ChatFeed, ChatBubble, Message} from 'react-chat-ui'
import Sidebar from "../../component/Sidebar"
import "./chat.css"
import user_icon from "../../images/user.png";
import Iris from "../../images/IRIS.png";
import send from "../../images/send.png"
import socketIOClient from "socket.io-client";

// socket
const endpoint = "http://140.117.71.98:4001"
const socket = socketIOClient(endpoint);

export default function Chatbox() {
  const [message, setMessage] = useState([new Message({id:1 ,message: 'Hello World!'})])
  const [current, setCurrent] = useState(1);
  var input = useRef();

  const onMessageSubmit = (e) => {
    const data = input
    e.preventDefault();
    if (!input.value) {
      return false;
    }
    pushMessage(0, data.value);
    socket.emit("chatbot",data.value)
    setCurrent(1)
    data.value = '';
    return true;
  }

  useEffect(()=>{
    socket.on("chatbot",res=>{
      pushMessage(1, res);
    })
  })

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
      <Row >
        <div className={"chat"+"-"+msg.id}>
          {msg.id? <img className="chat-icon" src={Iris} alt="profile_pic" />:""}
          {msg.id?"":<img className="chat-icon" src={user_icon} alt="profile_pic" />}
          <ChatBubble  message={msg} />
        </div>
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
      <div>
        <form id="message-form" onSubmit={onMessageSubmit}>
          <input ref={m => input = m} id="input" placeholder="Type your message..."></input>
          <img id="send-btn" onClick={onMessageSubmit} src={send}></img>
        </form>
      </div>
    </div>
  )
}