import React from "react";
import styled from "styled-components";

import MainGame from "../assets/mainGame.wav";

export default class BottomBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpOpen: true,
      volumeOpen: false,
      volumeLevel: 0.3
    };
  }

  componentDidMount() {
    let audio = document.querySelector("audio");
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
    }
  }
  render() {
    return (
      <BarView>
        <HelpModal id="help-view">
          <TheX onClick={() => this.helpModalToggle()}>
            {" "}
            <svg
              width="22"
              height="22"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0)">
                <path
                  d="M15.0425 14.77C15.1883 14.5415 16.3698 12.857 15.7268 12.6033C14.6855 12.5848 13.6688 12.6453 12.7118 12.1408C11.4493 11.4763 10.5113 10.5693 9.57302 9.50179C9.31977 9.21429 9.32502 8.84979 9.57302 8.56104C11.071 6.70279 12.853 5.39004 14.7275 3.79604C15.5718 3.04604 14.1653 1.73304 13.1338 1.63904C12.665 1.63904 12.1965 1.92029 11.727 2.10779C10.0395 3.13929 9.00802 4.73354 7.71452 6.11279C7.56977 6.28879 7.36352 6.33629 7.16602 6.29904C6.96827 6.26229 6.77927 6.14079 6.66977 5.97854C5.94752 4.90579 5.28977 3.76054 4.83727 2.54479C4.59502 1.89554 4.36827 1.23779 4.20527 0.56329C3.96327 -0.44671 3.59627 0.10329 3.17477 0.64754C2.02277 2.13404 1.58552 3.27454 2.59727 5.03754C3.34252 6.33654 4.14452 7.57804 5.06502 8.75954C5.23652 8.98004 5.35802 9.30654 5.16877 9.56554C4.75177 10.1368 4.23777 10.851 3.64077 11.5053C3.44266 11.724 3.23417 11.9331 3.01602 12.1318C2.16202 13.0785 0.380523 12.9848 0.0990234 13.829C-0.275477 14.579 1.03677 15.891 2.30027 15.9363C2.53337 15.917 2.76292 15.8672 2.98302 15.788C4.54052 15.239 5.83152 13.372 6.74302 12.1838C6.98852 11.863 7.47052 11.6993 7.78727 12.049C8.99002 13.3763 10.3835 15.1843 12.1918 15.6883C13.3488 16.0105 14.3638 15.8378 15.0413 14.7693"
                  fill="white"
                />
                <path
                  d="M1.4798 13.8275C1.7613 12.9832 3.5428 13.0775 4.3968 12.1302C4.61405 11.9332 4.8218 11.7222 5.02155 11.5037C5.61805 10.8495 6.13255 10.1352 6.54905 9.56395C6.7388 9.3052 6.6168 8.97845 6.44555 8.75795C5.52555 7.57645 4.7223 6.3352 3.97755 5.03595C3.04055 3.4032 3.34655 2.3047 4.3118 0.970453C4.27385 0.834767 4.23802 0.6985 4.2043 0.561703C3.9623 -0.448297 3.5953 0.101703 3.1738 0.645953C2.0218 2.13245 1.58455 3.27295 2.5963 5.03595C3.34155 6.33495 4.14355 7.57645 5.06405 8.75795C5.23555 8.97845 5.35705 9.30495 5.1678 9.56395C4.7508 10.1352 4.2368 10.8495 3.6398 11.5037C3.44168 11.7224 3.23319 11.9315 3.01505 12.1302C2.16105 13.077 0.379547 12.9832 0.0980468 13.8275C-0.276453 14.5775 1.0358 15.8895 2.2993 15.9347C2.53032 15.9151 2.75786 15.8659 2.9763 15.7882C1.98505 15.4182 1.17505 14.4365 1.4798 13.8275Z"
                  fill="#BEBEBE"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </TheX>
        </HelpModal>
        <SoundView
          onMouseEnter={() => this.volumeSliderHoverUp()}
          onMouseLeave={() => this.volumeSliderHoverDown()}
        >
          <div>
            <audio autoPlay loop>
              <source src={MainGame} type="audio/wav" />
            </audio>
          </div>
          <SoundImg onClick={() => this.stopMusic()}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.0016 12C20.0016 8.67188 17.9672 5.82188 15.0797 4.61719L14.3109 6.46406C16.4766 7.36875 18 9.50625 18 12C18 14.4984 16.4766 16.6313 14.3063 17.5359L15.075 19.3828C17.9672 18.1781 20.0016 15.3281 20.0016 12ZM15.9984 12C15.9984 10.3359 14.9812 8.91094 13.5375 8.31094L12.7687 10.1578C13.4906 10.4578 13.9969 11.1703 13.9969 12.0047C13.9969 12.8344 13.4906 13.5469 12.7687 13.8516L13.5375 15.6984C14.9812 15.0891 15.9984 13.6641 15.9984 12ZM16.6172 0.923438L15.8438 2.77031C19.4578 4.275 21.9984 7.8375 21.9984 12C21.9984 16.1578 19.4578 19.725 15.8438 21.2297L16.6125 23.0766C20.9531 21.2672 24 16.9922 24 12C24 7.00781 20.9531 2.73281 16.6172 0.923438ZM0 6.99844V16.9969H3.99844L11.0016 24V0L3.99844 6.99844H0Z"
                fill="white"
              />
            </svg>
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
          <CurrencyText>Gold:</CurrencyText>
          <CurrencyText>Stashed:</CurrencyText>
          <CurrencyText>Marks:</CurrencyText>
          <svg
            width="40"
            height="37"
            viewBox="0 0 40 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M31.4353 4.97327L18.8235 7.34827L6.31058 4.97327C2.89646 4.97327 0.124695 8.10352 0.124695 11.9676V23.7999C0.124695 27.6616 2.89646 30.7895 6.31058 30.7895L18.8235 28.3504L31.4353 30.7895C34.8541 30.7895 37.6235 27.6616 37.6235 23.7999V11.9676C37.6235 8.10352 34.8541 4.97327 31.4353 4.97327ZM14.1176 21.4724H11.84V23.75H4.70587V11.875H11.84V14.25H14.1176V21.4724ZM23.5294 23.75H16.4706V11.875H18.8235V21.4344H21.1765V11.875H23.5294V23.75ZM32.9412 19.0594L30.6823 19V23.75H28.1412L28.1882 19.0594H25.8823V11.875H28.1882V19.0594H30.6823V11.875H32.9412V19.0594Z"
              fill="#008C30"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.05884 19V21.4629H11.7788V19H7.05884Z"
              fill="#008C30"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.05884 14.25H11.8259V16.6939H7.05884V14.25Z"
              fill="#008C30"
            />
          </svg>
        </CurrencyView>
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

// Currency Styles

const CurrencyView = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  right: 0;
  width: 632px;
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
  height: 300px;
  width: 500px;
  background: rgba(0, 0, 0, 0.4);
`;

const TheX = styled.div`
  width: 30px;
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
`;
