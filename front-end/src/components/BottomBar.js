import React from "react";
import styled from "styled-components";

import MainGame from "../assets/mainGame.wav";

// Image Imports
import SKey from "../assets/TheSKey.svg";
import AKey from "../assets/TheAKey.svg";
import DKey from "../assets/TheDKey.svg";
import PKey from "../assets/ThePKey.svg";
import HelpX from "../assets/the-x.svg";
import soundOn from "../assets/subway_sound.svg";
import soundOff from "../assets/subway_mute.svg";
import gold from "../assets/gold_coin.svg";
import pickup from "../assets/pickup.svg";
import anchor from "../assets/anchor.svg";

export default class BottomBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpOpen: true,
      volumeOpen: false,
      volumeLevel: 0.3,
      playing: true
    };
  }

  componentDidMount() {
    const audio = document.querySelector("audio");
    audio.volume = this.state.volumeLevel;
  }
  helpModalToggle() {
    let help = document.querySelector("#help-view");
    if (this.state.helpOpen === false) {
      help.style.display = "block";
      this.setState({ helpOpen: true });
    } else {
      help.style.display = "none";
      this.setState({ helpOpen: false });
    }
  }

  volumeSliderHoverUp() {
    let volumeControl = document.querySelector("#volume-control");
    volumeControl.style.display = "block";
    this.setState({ volumeOpen: true });
  }

  volumeSliderHoverDown() {
    let volumeControl = document.querySelector("#volume-control");
    volumeControl.style.display = "none";
    this.setState({ volumeOpen: false });
  }

  adjustVolume(e) {
    let audio = document.querySelector("audio");
    this.setState({ volumeLevel: e.target.value });
    audio.volume = this.state.volumeLevel;
  }

  stopMusic() {
    let audio = document.querySelector("audio");
    if (audio.paused === true) {
      audio.play();
    } else {
      audio.pause();
      this.setState({ playing: false });
    }
  }
  render() {
    return (
      <BarView>
        <HelpModal id="help-view">
          <TheX onClick={() => this.helpModalToggle()}>
            <img src={HelpX} />
          </TheX>
          <ControlHelper>
            <img src={AKey}/>
            <img src={SKey}/>
            <img src={DKey}/>
            <img src={PKey}/>
          </ControlHelper>
        </HelpModal>
        <SoundView
          onMouseEnter={() => this.volumeSliderHoverUp()}
          onMouseLeave={() => this.volumeSliderHoverDown()}
        >
          <div>
            <audio loop>
              <source src={MainGame} type="audio/wav" />
            </audio>
          </div>
          <SoundImg onClick={() => this.stopMusic()}>
            <img src={soundOn} />
          </SoundImg>
          <SoundText>Sound</SoundText>
          <VolumeSlider id="volume-control">
            <VolumeControl
              value={this.state.volumeLevel}
              onChange={e => this.adjustVolume(e)}
            ></VolumeControl>
          </VolumeSlider>
        </SoundView>
        <HelpView onClick={() => this.helpModalToggle()}>
          <HelpImg>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2.33337C7.56704 2.33337 2.33337 7.56704 2.33337 14C2.33337 20.433 7.56704 25.6667 14 25.6667C20.433 25.6667 25.6667 20.433 25.6667 14C25.6667 7.56704 20.433 2.33337 14 2.33337ZM15.1667 21H12.8334V18.6667H15.1667V21ZM16.3054 15.3009C16.0767 15.4852 15.8562 15.6614 15.6812 15.8364C15.2052 16.3112 15.1679 16.7429 15.1667 16.7615V16.9167H12.8334V16.7219C12.8334 16.5842 12.8672 15.3487 14.0304 14.1855C14.2579 13.958 14.5402 13.727 14.8365 13.4867C15.6929 12.7925 16.2552 12.2862 16.2552 11.5885C16.2417 10.9992 15.998 10.4385 15.5763 10.0265C15.1546 9.61452 14.5884 9.38394 13.9989 9.38409C13.4094 9.38424 12.8433 9.61512 12.4218 10.0273C12.0004 10.4395 11.757 11.0003 11.7437 11.5897H9.41037C9.41037 9.05921 11.4695 7.00004 14 7.00004C16.5305 7.00004 18.5897 9.05921 18.5897 11.5897C18.5897 13.4529 17.2142 14.5647 16.3054 15.3009Z"
                fill="white"
              />
            </svg>
          </HelpImg>
          <HelpText>Help</HelpText>
        </HelpView>
        <CurrencyView>
          <CurrencyText>Gold: 0</CurrencyText>
          <img src={gold} />
        </CurrencyView>
        <Anchor>
          <img src={anchor} />
        </Anchor>
        <Pickup>
          <img src={pickup} />
        </Pickup>
      </BarView>
    );
  }
}

//  Styles

const BarView = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 37px;
  left: 0px;
  bottom: 0px;

  background: #7e0000;
  border: 1px solid #ffdc61;
  box-sizing: border-box;
`;

// Action Buttons

const Pickup = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: -220px;
  left: 520px;
  height: 100px;
  width: 100px;
  background: #f1dbb1;
  border-radius: 4px;
  cursor: pointer;
`;

const Anchor = styled.div`
  position: absolute;
  top: -110px;
  left: 520px;
  height: 100px;
  width: 100px;
  background: #f1dbb1;
  border-radius: 4px;
  cursor: pointer;
`;

// Currency Styles

const CurrencyView = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  right: 0;
  width: 232px;
  height: 36px;

  background: linear-gradient(
      0deg,
      rgba(241, 219, 177, 0.7),
      rgba(241, 219, 177, 0.7)
    ),
    linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(86277jpg);
  border: 1px solid #ffdc61;
  box-sizing: border-box;
`;

const CurrencyText = styled.p`
  margin-top: 1px;
  margin-left: 5px;
  font-family: Pirata One;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 31px;
  /* identical to box height */

  color: #000000;
`;

// Styles for the Sound Controls

const SoundView = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  margin-left: 15px;
  height: 37px;
`;

const SoundImg = styled.div`
  margin-right: 10px;
  margin-top: 5px;
`;

const SoundText = styled.p`
  margin-top: 2px;
  font-family: Pirata One;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 31px;
  /* identical to box height */

  color: #ffffff;
`;

const VolumeSlider = styled.div`
  display: none;
  position: absolute;
  top: -38px;
  left: 0px;
  height: 38px;
  width: 150px;
  background: #7e0000;
  transition: 0.5s;
`;

const VolumeControl = styled.input.attrs({
  type: "range",
  min: "0",
  max: "1",
  step: "0.1"
})`
  cursor: pointer;
  margin-top: 10px;
`;
// Styles for the Help Text box

const HelpView = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  margin-left: 40px;
  height: 37px;
`;

const HelpImg = styled.div`
  margin-right: 8px;
  margin-top: 3px;
`;

const HelpText = styled.p`
  margin-top: 2px;
  font-family: Pirata One;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 31px;
  /* identical to box height */

  color: #ffffff;
`;

const HelpModal = styled.div`
  display: block;
  position: absolute;
  top: -65vh;
  left: 33vw;
  height: 330px;
  width: 500px;
  background: rgba(0, 0, 0, 0.7);
`;

const TheX = styled.div`
  width: 30px;
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
`;

const ControlHelper = styled.div`
`;
