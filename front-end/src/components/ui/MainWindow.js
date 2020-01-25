import React from 'react'
import Style from './style/mainwindow'

// import UI components
import BottomBar from './bottom_bar/BottomBar.js'

export default class MainWindow extends React.Component {
  render() {
    return (
      <Style>
        <BottomBar />
      </Style>
    )
  }
}