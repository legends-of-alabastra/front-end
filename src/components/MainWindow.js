import React from "react";

//game component
import Game from "./game/Game";

// Import RAID product placement
// import RAID from "../assets/RAID.jpg";

// import UI components
// import MapWindow from "./MapWindow.js";
import InfoWindow from "./InfoWindow.js";
import ChatWindow from "./ChatWindow.js";

export default class MainWindow extends React.Component {
  render() {
    const main_view = {
      overflow: 'hidden',
      width: '100vw',
      height: '100vh'
    }
    
    return (
      <div style = { main_view }>
        <Game />
        <InfoWindow />
        <ChatWindow />
      </div>
    );
  }
}
