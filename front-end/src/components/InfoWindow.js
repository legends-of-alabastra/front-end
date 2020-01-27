import React from "react";
import Pusher from "pusher-js";

export default class InfoWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };

    let pusher = new Pusher("c94e812bb791c21a37e8", {
      cluster: "us2",
      forceTLS: true
    });

    let channel = pusher.subscribe("my-channel");
    channel.bind("room", function(data) {
      let roomMessage = document.createElement("p");
      let a = document.createTextNode(JSON.stringify(data.description));
      roomMessage.appendChild(a);
      document.querySelector("#info-feed").appendChild(roomMessage);
      document.querySelector("#info-feed").scrollTo(0, 235);
    });
  }

  roomUpdate() {}

  boxToggle() {
    let view = document.querySelector("#info-view");
    if (this.state.open === false) {
      view.style.bottom = "37px";
      this.setState({ open: true });
    } else {
      view.style.bottom = "-201px";
      this.setState({ open: false });
    }
  }

  render() {
    const info_view = {
      position: 'absolute',
      width: '500px',
      height: '238px',
      right: '0',
      bottom: '37px',
      border: '2px solid #ffdc61',
      background: 'rgba(0, 0, 0, 0.4)',
      boxSizing: 'border-box',
      transition: '0.5s'
    }

    const info_tab = {
      zIndex: '1000',
      position: 'absolute',
      width: '72px',
      height: '29px',
      left: '60px',
      top: '-30px',
      cursor: 'pointer',
      background: '#f1dbb1',
      border: '1px solid #ffdc61',
      boxSizing: 'border-box',
      borderRadius: '4px 4px 0px 0px',
    }

    const info_text = {
      marginTop: '-1px',
      fontFamily: 'Pirata One',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '24px',
      lineHeight: '31px',
      color: '#000000'
    }

    const info_feed = {
      overflow: 'auto',
      height: '235px'
    }

    const welcome_message = {
      fontFamily: 'Pirata One',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '24px',
      lineHeight: '31px',
      color: '#ffffff'
    }

    return (
      <div 
        style = { info_view }
        id="info-view"
      >
        <div 
          style = { info_tab }
          onClick={() => this.boxToggle()}
        >
          <div style = { info_text }>Info</div>
        </div>
        <div 
          id="info-feed"
          style = { info_feed }
        >
          <div style = { welcome_message }>Welcome to Legends of Alabastra!</div>
        </div>
      </div>
    );
  }
}
