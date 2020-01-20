import React from "react";
import styled from "styled-components";

// import UI components
import MapWindow from "./MapWindow.js";
import StatsWindow from "./StatsWindow.js";
import RoomWindow from "./RoomWindow.js";
import InfoWindow from "./InfoWindow.js";
import ChatWindow from "./ChatWindow.js";
import BottomBar from "./BottomBar.js";

export default class MainWindow extends React.Component {
  render() {
    return (
      <MainView>
        <MapWindow />
        <StatsWindow />
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
    background-color: blue;
`