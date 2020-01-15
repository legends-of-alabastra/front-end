import React from "react";
import styled from "styled-components";

export default class RoomWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  boxToggle() {
    let view = document.querySelector("#room-view");
    if (this.state.open === false) {
      view.style.right = "0px";
      this.setState({ open: true });
    } else {
      view.style.right = "-283px";
      this.setState({ open: false });
    }
  }

  render() {
    return (
      <RoomView id="room-view">
        <RoomTab onClick={() => this.boxToggle()}>
          <RoomText>Room</RoomText>
        </RoomTab>
      </RoomView>
    );
  }
}

// Styles

const RoomView = styled.div`
  position: absolute;
  width: 283px;
  height: 342px;
  right: 0px;
  top: 0px;
  border: 2px solid #ffdc61;
  background: rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  transition: 0.5s;
`;

const RoomTab = styled.div`
  position: absolute;
  width: 72px;
  height: 29px;
  left: -52px;
  top: 60px;
  cursor: pointer;
  background: #f1dbb1;
  border: 1px solid #ffdc61;
  box-sizing: border-box;
  border-radius: 4px 4px 0px 0px;
  transform: rotate(-90deg);
`;

const RoomText = styled.p`
  margin-top: -1px;
  font-family: Pirata One;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 31px;
  /* identical to box height */

  color: #000000;
`;
