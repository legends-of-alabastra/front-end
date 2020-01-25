import React from 'react'
//style
import Style from './style'
//components
import VolumeControl from './VolumeControl'
//audio
//images

export default class BottomBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Style className='bottom-bar'>
        <VolumeControl/>
      </Style>
    )
  }
}