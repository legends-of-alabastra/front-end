import React from "react";
import styled from "styled-components";

//game component
import Game from "./game";

// Import RAID product placement
import RAID from "../assets/RAID.jpg";

// import UI components
import MapWindow from "./MapWindow.js";
import ViewPort from "./ViewPort.js";
import RoomWindow from "./RoomWindow.js";
import InfoWindow from "./InfoWindow.js";
import ChatWindow from "./ChatWindow.js";
import BottomBar from "./BottomBar.js";

export default class MainWindow extends React.Component {
  render() {
    return (
      <MainView>
        <Game />
        <MapWindow />
        <RoomWindow />
        <InfoWindow />
        <ChatWindow />
        <BottomBar />
      </MainView>
    );
  }
}

// Styling

const MainView = styled.div`
  overflow: hidden;
  position: relative;
  margin: auto;
  margin-top: 1vh;
  width: 99vw;
  height: 98vh;
`;
