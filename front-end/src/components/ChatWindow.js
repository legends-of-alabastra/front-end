import React from "react";
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
    const chat_view = {
      position: 'absolute',
      width: '500px',
      height: '238px',
      left: '0',
      bottom: '37px',
      background: 'rgba(0, 0, 0, 0.4)',
      border: '2px solid #ffdc61',
      boxSizing: 'border-box',
      transition: '0.5s'
    }

    const chat_tab = {
      position: 'absolute',
      width: '72px',
      height: '29px',
      right: '60px',
      top: '-30px',
      cursor: 'pointer',
      background: '#f1dbb1',
      border: '1px solid #ffdc61',
      boxSizing: 'border-box',
      borderRadius: '4px 4px 0px 0px'
    }

    const chat_text = {
      margintop: '-1px',
      fontFamily: 'Pirata One',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '24px',
      lineHeight: '31px',
      color: '#000000'
    }

    return (
      <div
        style = { chat_view } 
        id="chat-view"
      >
        <div 
          style = { chat_tab }
          onClick={() => this.boxToggle()}
        >
          <div style = { chat_text }>Chat</div>
        </div>
        <div>
          <ChatClient/>
        </div>
      </div>
    );
  }
}
