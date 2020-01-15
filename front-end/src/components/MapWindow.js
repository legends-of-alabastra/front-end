import React from "react";
import styled from "styled-components";

export default class MapWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  boxToggle() {
    let view = document.querySelector("#map-view");
    if (this.state.open === false) {
      view.style.left = "0px";
      this.setState({ open: true });
    } else {
      view.style.left = "-272px";
      this.setState({ open: false });
    }
  }

  render() {
    return (
      <MapView id="map-view">
        <MapTab onClick={() => this.boxToggle()}>
          <MapText>Map</MapText>
        </MapTab>
      </MapView>
    );
  }
}

// Styles

const MapView = styled.div`
  height: 310px;
  width: 272px;
  position: absolute;
  left: 0px;
  border: 2px solid #ffdc61;
  background: rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  transition: 0.5s;
`;

const MapTab = styled.div`
  position: absolute;
  width: 72px;
  height: 29px;
  right: -52px;
  top: 60px;
  cursor: pointer;
  background: #f1dbb1;
  border: 1px solid #ffdc61;
  box-sizing: border-box;
  border-radius: 4px 4px 0px 0px;
  transform: rotate(90deg);
`;

const MapText = styled.p`
  margin-top: -1px;
  font-family: Pirata One;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 31px;
  /* identical to box height */

  color: #000000;
`;
