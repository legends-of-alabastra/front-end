import React from "react";
import styled from "styled-components";
import ChatClient from "./ChatClient.js";

// SVG imports
import sen from "../assets/send.svg";

export default class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }


  boxToggle() {
    let view = document.querySelector("#chat-view");
    if (this.state.open === false) {
      view.style.bottom = "37px";
      this.setState({ open: true });
    } else {
      view.style.bottom = "-201px";
      this.setState({ open: false });
    }
  }
  render() {
    return (
      <ChatView id="chat-view">
        <ChatTab onClick={() => this.boxToggle()}>
          <ChatText>Chat</ChatText>
        </ChatTab>
        <Chat>
        <ChatClient/>
        </Chat>
      </ChatView>
    );
  }
}



// Styles

//   background: rgba(0, 0, 0, 0.4);
const ChatView = styled.div`
  position: absolute;
  width: 500px;
  height: 238px;
  left: 0;
  bottom: 37px;
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid #ffdc61;
  box-sizing: border-box;
  transition: 0.5s;
`;

const ChatTab = styled.div`
  position: absolute;
  width: 72px;
  height: 29px;
  right: 60px;
  top: -30px;
  cursor: pointer;
  background: #f1dbb1;
  border: 1px solid #ffdc61;
  box-sizing: border-box;
  border-radius: 4px 4px 0px 0px;
`;

const ChatText = styled.p`
  margin-top: -1px;
  font-family: Pirata One;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 31px;
  /* identical to box height */

  color: #000000;
`;

const Chat = styled.div``;
