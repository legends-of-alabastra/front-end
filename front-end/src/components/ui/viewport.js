import React from 'react'
import Style from './style'

// import UI components
import Game from './game'
import BottomBar from './bottom_bar'

export default class MainWindow extends React.Component {
  render() {
    return (
      <Style className='viewport'>
        <Game />
        <BottomBar />
      </Style>
    )
  }
}