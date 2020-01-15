import React from "react";

// import UI components
import MapWindow from "./MapWindow.js";
import StatsWindow from "./StatsWindow.js";
import RoomWindow from "./RoomWindow.js";
import InfoWindow from "./InfoWindow.js";
import ChatWindow from "./ChatWindow.js";

export default class MainWindow extends React.Component {
  render() {
    return (
      <div>
        <MapWindow />
        <StatsWindow />
        <RoomWindow />
        <InfoWindow />
        <ChatWindow />
      </div>
    );
  }
}
