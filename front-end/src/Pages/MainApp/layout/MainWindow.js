import React, { Component } from "react";

import BottomBar from '../components/BottomBar';

import MainGame from "../../../assets/mainGame.wav";

export default class MainWindow extends Component {
  state = {
    windows: {
      map: false,
      stats: false,
      room: false,
      info: false,
      chat: false
    },
    volumeLevel: 0.3
  }

  componentDidMount() {
    const audio = this.refs.audio;
    audio.volume = this.state.volumeLevel;
    audio.play();
  }

  changeVolume = e => {
    
  }

  openWindow = window => {
    this.setState({ windows: {
      ...this.state.windows,
      [window]: !this.state.windows[window]
    } })
  }
  
  render() {
    const { windows } = this.state;
    const { map, stats, room, info, chat } = windows;

    const styles = style => {
      const styles = {
        container: {
          overflow: 'hidden',
          margin: 'auto',
          marginTop: '1vh',
          width: '99vw',
          height: '98vh',
          backgroundColor: 'blue'
        },
        view: {
          position: 'absolute',
          border: '2px solid #ffdc61',
          background: 'rgba(0, 0, 0, 0.4)',
        },
        tab: {
          position: 'absolute',
          width: '72px',
          height: '29px',
          cursor: 'pointer',
          textAlign: 'center',
          background: '#f1dbb1',
          border: '1px solid #ffdc61',
        },
        text: {
          marginTop: '-1px',
          fontFamily: 'Pirata One',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '24px',
          lineHeight: /* identical to box height */ '31px',
          color: '#000000'
        }
      }

      const { container, view, tab, text } = styles;

      switch(style) {
        case 'container':
          return container;
        case 'map':
          return {
            view: {
              ...view,
              height: '310px',
              width: '272px',
              left: map ? '0px' : '-272px',
              transition: 'left 0.5s'
            },
            
            tab: {
              ...tab,
              right:  '-52px',
              top: '60px',
              borderRadius: '4px 4px 0px 0px',
              transform: 'rotate(90deg)',
            },
  
            text
          };

        case 'stats':
          return {
            view: {
              ...view,
              width: '301px',
              height: '320px',
              left: stats ? '0px' : '-301px',
              top: '332px',
              transition: 'left 0.5s'
            },

            tab: {
              ...tab,
              right: '-52px',
              top: '60px',
              borderRadius: '4px 4px 0px 0px',
              transform: 'rotate(90deg)'
            },

            text
          };

        case 'room':
          return {
            view: {
              ...view,
              width: '283px',
              height: '342px',
              right: room ? '0px' : '-283px',
              top: '0px',
              transition: 'right 0.5s'
            },
            tab: {
              ...tab,
              left: '-52px',
              top: '60px',
              borderRadius: '4px 4px 0px 0px',
              transform: 'rotate(-90deg)',
            },
            text,
          };

          case 'chat':
            return {
              view: {
                ...view,
                width: '500px',
                height: '238px',
                left: '0',
                bottom: chat ? '37px' : '-201px',
                transition: 'bottom 0.5s'
              },
  
              tab: {
                ...tab,
                right: '60px',
                top: '-30px',
                borderRadius: '4px 4px 0px 0px'
              },
  
              text
            };

        case 'info':
          return {
            view: {
              ...view,
              width: '500px',
              height: '238px',
              right: '0',
              bottom: info ? '37px' : '-201px',
              transition: 'bottom 0.5s'
            },

            tab: {
              ...tab,
              left: '60px',
              top: '-30px',
              borderRadius: '4px 4px 0px 0px'
            },

            text
          };
        
        case 'text': 
          return text;

        default: return null;
      }
    }

    let windowsData = [
      { name: 'Map' },
      { name: 'Stats' }, 
      { name: 'Room' },
      { name: 'Info' }, 
      { name: 'Chat' }
    ];

    const _ = styles;

    windowsData = windowsData.map(window => window = {
      ...window,
      styles: _(window.name.toLowerCase())
    })
    
    return (
      <>
        <audio loop ref="audio">
          <source src = { MainGame } type="audio/wav" />
        </audio>
        <div style = { _('container') }>
          { windowsData.map(window => (
            <Window 
              name = { window.name }
              styles = { window.styles }
              openWindow = { this.openWindow }
            />
          )) }
          <BottomBar 
            _text = { _('text') } 
          />
        </div>
      </>
    );
  }
}

const Window = props => {
  const { name, styles, openWindow } = props
  const { view, tab, text } = styles;
  const _name = name.toLowerCase()

  return (
    <div style = { view }>
      <div 
        style = { tab }
        onClick = { () => openWindow(_name) }
      >
        <div style = { text }>
          { name }
        </div>
      </div>
    </div>
  )
}