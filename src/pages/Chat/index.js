import React , { useEffect, useState, useRef } from "react"
import { Row , Col } from "react-bootstrap"
import {ChatFeed, ChatBubble, Message} from 'react-chat-ui'
import Sidebar from "../../component/Sidebar"
import "./chat.css"
import user_icon from "../../images/user.png";

export default function Chatbox() {
  const [message, setMessage] = useState([new Message({id:1 ,message: 'Hello World!'}), new Message({id:0, message:"Hi!"})])
  var input = useRef();

  const onMessageSubmit = (e) => {
    const data = input
    e.preventDefault();
    if (!input.value) {
      return false;
    }
    pushMessage(0, data.value);
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

  return(
    <div className="chatbox">
      <Sidebar />
      <Row id="title">
        <Col >IRIS</Col>
      </Row>
      <Row className="chat">
        <img className="chat-icon" src={user_icon} alt="profile_pic" />
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
      </Row>
      <form >
        <input ref={m => input = m} id="input" placeholder="Type your message..."></input>
        <button onClick={onMessageSubmit}>test</button>
      </form>
    </div>
  )
}