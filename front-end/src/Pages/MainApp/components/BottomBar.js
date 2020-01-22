import React, { Component } from "react";

import HelpX from "../../../assets/the-x.svg";
import WASD from "../../../assets/WASD.svg";
import soundOn from "../../../assets/subway_sound.svg";
import HelpImg from "../../../assets/help_img.svg";
import BuyIcon from "../../../assets/buy_premium.svg";

export default class BottomBar extends Component {
  state = {
    volumeOpen: false
  }

  render() {
    const { _text } = this.props;
    const { volumeLevel, volumeOpen } = this.state;

    const styles = {
      _view: {
        position: 'absolute',
        display: 'flex',
        width: '100%',
        height: '37px',
        left: '0px',
        bottom: '0px',
        background: '#7e0000',
        border: '1px solid #ffdc61'
      },
      _helpModal: {
        display: 'block',
        position: 'absolute',
        top: '-65vh',
        left: '33vw',
        height: '300px',
        width: '500px',
        background: 'rgba(0, 0, 0, 0.4)'
      },
      _theX: {
        display: 'block',
        position: 'absolute',
        top: '-65vh',
        left: '33vw',
        height: '300px',
        width: '500px',
        background: 'rgba(0, 0, 0, 0.4)'
      },
      _controllerHelper: {
        marginTop: '30px'
      },
      _helpText: {
        ..._text,
        color: '#ffffff'
      },
      _soundView: {
        display: 'flex',
        cursor: 'pointer',
        marginLeft: '15px',
        height: '37px'
      },
      _soundImg: {
        marginRight: '10px',
        marginTop: '5px'
      },
      _soundText: {
        ..._text,
        color: '#ffffff'
      },
      _volumeSlider: {
        display: volumeOpen ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '-38px',
        left: '0px',
        height: '38px',
        width: '150px',
        background: '#7e0000',
        transition: '0.5s'
      },
      _volumeControl: {
        cursor: 'pointer'
      },
      _helpView: {
        display: 'flex',
        cursor: 'pointer',
        marginLeft: '40px',
        height: '37px'
      },
      _helpImg: {
        marginRight: '8px',
        marginTop: '3px'
      },
      _currencyView: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'space-between',
        right: 0,
        width: '632px',
        height: '36px',

        background: 'linear-gradient(0deg, rgba(241, 219, 177, 0.7), rgba(241, 219, 177, 0.7)), linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(86277jpg)',
        border: '1px solid #ffdc61',
      },
      _currencyText: {
        ..._text,
        color: '#000000'
      }
    }

    const { _view, _helpModal, _theX, _controllerHelper, _helpText, _soundView, _soundImg, _soundText,_volumeSlider, _volumeControl, _helpView, _helpImg, _currencyView, _currencyText } = styles;

    return (
      <div style = { _view }>
        <div style = { _helpModal }>
          <div style = { _theX }>
            <img src = { HelpX } />
          </div>
          <div style = { _controllerHelper }>
            <img src = { WASD } />
            <p style = { _helpText }>
              Movement is controlled with the WASD keys.
            </p>
            <p style = { _helpText }>
              Just so you know.
            </p>
          </div>
        </div>
        <div 
          style = { _soundView }
          onMouseEnter = { () => this.setState({ volumeOpen: true }) }
          onMouseLeave = { () => this.setState({ volumeOpen: false }) }
        >
          <div style = { _soundImg }>
            <img src={soundOn} />
          </div>
          <p style = { _soundText }>
            Sound
          </p>
          <div style = { _volumeSlider }>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.1"
              volume = { volumeLevel }
              style = { _volumeControl }
              value = { volumeLevel }
              onChange = { e => this.changeColume(e) }
            />
          </div>
        </div>
        <div style = { _helpView }>
          <div style = { _helpImg }>
            <img src = { HelpImg } />
          </div>
          <div style = { _helpText }>Help</div>
        </div>
        <div style = { _currencyView }>
          <p style = { _currencyText }>Gold:</p>
          <p style = { _currencyText }>Stashed:</p>
          <p style = { _currencyText }>Marks:</p>
          <img src = { BuyIcon } />
        </div>
      </div> 
    )
  }
}