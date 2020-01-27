import React from "react";

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
  state = {
    helpOpen: true,
    volumeOpen: false,
    volumeLevel: 0.3,
    playing: true
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
    const bar_view = {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '37px',
      left: '0px',
      bottom: '0px',
      background: '#7e0000',
      border: '1px solid #ffdc61',
      boxSizing: 'border-box'
    }

    const pickup_view = {
      display: 'flex',
      justifyContent: 'center',
      position: 'absolute',
      top: '-220px',
      left: '520px',
      height: '100px',
      width: '100px',
      background: '#f1dbb1',
      borderRadius: '4px',
      cursor: 'pointer'
    }

    const anchor_view = {
      position: 'absolute',
      top: '-110px',
      left: '520px',
      height: '100px',
      width: '100px',
      background: '#f1dbb1',
      borderRadius: '4px',
      cursor: 'pointer'
    }

    const currency_view = {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      right: '0',
      width: '232px',
      height: '36px',
      background: 'linear-gradient(0deg,rgba(241, 219, 177, 0.7),rgba(241, 219, 177, 0.7)),linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(86277jpg)',
      border: '1px solid #ffdc61',
      boxSizing: 'border-box'
    }

    const currency_text = {
      marginTop: '1px',
      marginLeft: '5px',
      fontFamily: 'Pirata One',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '24px',
      lineHeight: '31px',
      color: '#000000'
    }

    const sound_view = {
      display: 'flex',
      cursor: 'pointer',
      flexDirection: 'row',
      marginLeft: '15px',
      height: '37px'
    }

    const sound_img = {
      marginRight: '10px',
      marginTop: '5px'
    }

    const sound_text = {
      marginTop: '2px',
      fontFamily: 'Pirata One',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '24px',
      lineHeight: '31px',
      color: '#ffffff'
    }

    const volume_slider = {
      display: 'none',
      position: 'absolute',
      top: '-38px',
      left: '0px',
      height: '38px',
      width: '150px',
      background: '#7e0000',
      transition: '0.5s'
    }

    const volume_control = {
      cursor: 'pointer',
      marginTop: '10px'
    }

    const help_view = {
      display: 'flex',
      flexDirection: 'row',
      cursor: 'pointer',
      marginLeft: '40px',
      height: '37px'
    }

    const help_img = {
      marginRight: '8px',
      marginTop: '3px'
    }

    const help_text = {
      marginTop: '2px',
      fontFamily: 'Pirata One',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '24px',
      lineHeight: '31px',
      color: '#ffffff'
    }

    const help_modal = {
      display: 'block',
      position: 'absolute',
      top: '-65vh',
      left: '33vw',
      height: '330px',
      width: '500px',
      background: 'rgba(0, 0, 0, 0.7)'
    }

    const the_x = {
      width: '30px',
      position: 'absolute',
      right: '5px',
      top: '5px',
      cursor: 'pointer'
    }

    const keys = {
      marginLeft: '40px'
    }

    return (
      <div style = { bar_view }>
        <div style = { help_modal } id="help-view">
          <div style = { the_x } onClick={() => this.helpModalToggle()}>
            <img src={HelpX} />
          </div>
          <div style = { keys }>
            <img src={AKey}/>
            <img src={SKey}/>
            <img src={DKey}/>
            <img src={PKey}/>
          </div>
        </div>
        <div
          style = { sound_view }
          onMouseEnter={() => this.volumeSliderHoverUp()}
          onMouseLeave={() => this.volumeSliderHoverDown()}
        >
          <div>
            <audio loop>
              <source src={MainGame} type="audio/wav" />
            </audio>
          </div>
          <div style = { sound_img } onClick={() => this.stopMusic()}>
            <img src={soundOn} />
          </div>
          <p style = { sound_text }>Sound</p>
          <div style = { volume_slider } id="volume-control">
            <input
              min="0"
              max="1"
              step="0.1"
              style = { volume_control }
              type="range"
              value={this.state.volumeLevel}
              onChange={e => this.adjustVolume(e)}
            />
          </div>
        </div>
        <div style = { help_view } onClick={() => this.helpModalToggle()}>
          <div style = { help_img }>
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
          </div>
          <p style = { help_text }>Help</p>
        </div>
        <div style = { currency_view }>
          <p style = { currency_text }>Gold: 0</p>
          <img src={gold} />
        </div>
        <div style = { anchor_view }>
          <img src={anchor} />
        </div>
        <div style = { pickup_view }>
          <img src={pickup} />
        </div>
      </div>
    );
  }
}
