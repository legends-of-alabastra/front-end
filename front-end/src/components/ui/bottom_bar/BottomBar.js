import React from 'react'
//style
import Style from './style/style'
//components
import VolumeControl from './VolumeControl'
//audio
//images

export default class BottomBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      helpOpen: true,
      volumeOpen: false,
      volumeLevel: 0.3,
      playing: true
    }
  }
  render() {
    return (
      <Style className='bottom-bar'>
        <VolumeControl/>
      </Style>
    )
  }
}