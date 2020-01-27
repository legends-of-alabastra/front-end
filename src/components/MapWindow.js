import React from "react";

export default class MapWindow extends React.Component {
  state = {
    open: true
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
    const map_view = {
      height: '310px',
      width: '272px',
      position: 'absolute',
      top: '0px',
      left: '0px',
      border: '2px solid #ffdc61',
      background: 'rgba(0, 0, 0, 0.4)',
      boxSizing: 'border-box',
      transition: '0.5s'
    }

    const map_tab = {
      position: 'absolute',
      width: '72px',
      height: '29px',
      right: '-52px',
      top: '60px',
      cursor: 'pointer',
      background: '#f1dbb1',
      border: '1px solid #ffdc61',
      boxSizing: 'border-box',
      borderRadius: '4px 4px 0px 0px',
      transform: 'rotate(90deg)'
    }

    const map_text = {
      marginTop: '-1px',
      fontFamily: 'Pirata One',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '24px',
      lineHeight: '31px',
      color: '#000000'
    }

    return (
      <div 
        id="map-view"
        style = { map_view }
      >
        <div 
          onClick={() => this.boxToggle()}
          style = { map_tab }
        >
          <div style = { map_text }>Map</div>
        </div>
      </div>
    );
  }
}