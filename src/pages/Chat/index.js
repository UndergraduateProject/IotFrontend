import React , { useEffect, useState, useRef } from "react"
import { Row , Col } from "react-bootstrap"
import {ChatFeed, ChatBubble, Message} from 'react-chat-ui'
import Sidebar from "../../component/Sidebar"
import "./chat.css"
import user_icon from "../../images/user.png";

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
      {template}
      <form id="message-form">
        <input ref={m => input = m} id="input" placeholder="Type your message..."></input>
        <button id="send-btn" onClick={onMessageSubmit}>send</button>
      </form>
    </div>
  )
}