import React from "react";
import styled from "styled-components";

export default class InfoWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

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
      </InfoView>
    );
  }
}

// Styles

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
