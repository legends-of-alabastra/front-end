import React from "react";
import styled from "styled-components";
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
      let a = document.createTextNode(JSON.stringify(data.message));
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
    return (
      <InfoView id="info-view">
        <InfoTab onClick={() => this.boxToggle()}>
          <InfoText>Info</InfoText>
        </InfoTab>
        <InfoFeed id="info-feed">
          <WelcomeMessage>Welcome to Legends of Alabastra!</WelcomeMessage>
        </InfoFeed>
      </InfoView>
    );
  }
}

// Styles

// background: rgba(0, 0, 0, 0.4);
const InfoView = styled.div`
  position: absolute;
  width: 500px;
  height: 238px;
  right: 0;
  bottom: 37px;
  border: 2px solid #ffdc61;
  background: rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  transition: 0.5s;
`;

const InfoTab = styled.div`
  z-index: 1000;
  position: absolute;
  width: 72px;
  height: 29px;
  left: 60px;
  top: -30px;
  cursor: pointer;
  background: #f1dbb1;
  border: 1px solid #ffdc61;
  box-sizing: border-box;
  border-radius: 4px 4px 0px 0px;
`;

const InfoText = styled.p`
  margin-top: -1px;
  font-family: Pirata One;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 31px;
  /* identical to box height */

  color: #000000;
`;

const InfoFeed = styled.div`
  overflow: auto;
  height: 235px;
`;

const WelcomeMessage = styled.h1`
  font-family: Pirata One;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 31px;
  /* identical to box height */

  color: #ffffff;
`;
