import React, { Component } from 'react';

const logo = require('../assets/Logo-t-back.png')
const lambdaBoat = require('../assets/Lambda Boat (1).png')
const tools = [
  { name: 'Django', src: require('../assets/django_logo.png') },
  { name: 'Python', src: require('../assets/logo-python.png') },
  { name: 'React', src: require('../assets/react-logo-1000-transparent.png') },
  { name: 'Canvas', src: require('../assets/HTML5_Logo_512.png') }
]

export class Landing extends Component {
  render() {
    const container = {
      background: '#2F2F2F',
      color: 'white',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden'
    }

    return (
      <div style = { container }>
        <TopBar { ...this.props }/>
        <Main />
        <Bottom />
      </div>
    )
  }
}

const TopBar = props => {
  const container = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    height: '10%',
    borderBottom: '2px solid #C4AB52'
  }

  const logo_style = {
    height: '100%'
  }

  const title = {
    fontSize: '2.3rem',
    fontFamily: "'Pirata One', cursive"
  }

  const button = {
    background: '#F1DBB1',
    fontSize: '1.1rem',
    cursor: 'pointer',
    padding: '4px'
  }

  const even_space = x => ({
    display: 'flex',
    justifyContent: 'flex-' + x,
    alignItems: 'center',
    width: '25%',
    height: '100%'
  })

  return (
    <div style = { container }>
      <div style = { even_space('start') }>
        <img 
          style = { logo_style }
          src = { logo }
          alt = {'seniorkicker'}
        />
      </div>
      <h1 style = { title }>Legends of Albastra</h1>
      <div style = { even_space('end') }>
        <button 
          style = { button } 
          onClick = { () => props.history.push('/auth') }
        >
          Play Now!
        </button>
      </div>
    </div>
  )
}

const Main = props => {
  const container = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '70%',
    paddingTop: '10px'
  }

  const top = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '80%'
  }

  const bottom = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '20%',
    width: '100%'
  }

  const ship = {
    height: '80%',
    marginBottom: '10px'
  }

  const names = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    padding: '0 50px',
    height: '90%',
    fontSize: '1.1rem',
    color: 'lightgrey'
  }

  const created_by = {
    width: '100%',
    fontSize: '1.5rem',
    padding: '0 20px',
    fontFamily: "'Pirata One', cursive"
  }

  const title = {
    fontSize: '1.5rem'
  }

  return (
    <div style = { container }>
      <div style = { top }>
        <img 
          src = { lambdaBoat }
          style = { ship }
          alt = {'seniorkicker'}
        />
        <h2 style = { title }>A Legendary <span style = {{ fontFamily: "'Pirata One', cursive" }}>pirate</span> adventure M U D</h2>
      </div>
      <div style = { bottom }>
        <span style = { created_by }>Created By:</span>
        <div style = { names }>
          { ['Miguel Diaz', 'Dustin Snoap', 'Douglas Jordan', 'Christian Ford', 'Mychal Hall'].map((name,key) => (
            <span key={key}>{ name }</span>
          )) }
        </div>
      </div>
    </div>
  )
}

const Bottom = props => {
  const container = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 150px 10px 20px',
    border: '2px solid yellow',
    height: '20%',
    background: '#FAFAFA'
  }

  const images = {
    height: '80%',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '1.5rem'
  }

  const image = {
    height: '80%',
  }

  const span = {
    color: 'black',
    fontSize: '1.5rem',
    fontFamily: "'Pirata One', cursive"
  }

  return (
    <div style = { container }>
      <span style = { span }>Made with love using:</span>
      { tools.map((tool,key) => (
        <div key={key} style = { images }>
          <img 
            src = { tool.src } 
            style = { image }
            alt = {'seniorkicker'}
          />
          <span>{ tool.name }</span>
        </div>
      )) }
    </div>
  )
}

export default Landing
