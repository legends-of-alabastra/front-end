import React, { Component } from 'react';
import axios from 'axios';

const logo = require('../assets/Logo-t-back.png')

export default class Auth extends Component {
  state = {
    type: 'login',
    email: '',
    username: '',
    password: '',
    gem: "0",
    gold: "0",
    id: ''
  }

  changeType = type => this.setState({ type })

  handleSubmit = e => {
    e.preventDefault()

    const { email, username, password, gem, gold, id } = this.state;

    if(this.state.type === 'login') {
      const user = {
        username, password
      }

      axios
        .post('https://alabastraapp.herokuapp.com/api/auth/login', user)
        .then(res => {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user_id', res.data.id)
        })
        .then(() => this.props.history.push('/app'))
        .catch(err => console.log(err))

    } else {
      const user = {
        email, username, password
      }

      axios
        .post('https://alabastraapp.herokuapp.com/api/auth/register', user)
        .then(res => {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user_id', res.data.user.id)
          localStorage.setItem('username', username)

          const { user } = res.data
          
          axios
            .post('https://alabastraapp.herokuapp.com/playeritems/', {
              id: user.id, username: user.username, gold: "0", gem: "0"
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        })
        .then(() => this.props.history.push('/app'))
        .catch(err => console.log(err))
    }
  }

  handleChange = e => {
    this.setState({ [e.target.placeholder.toLowerCase()]: e.target.value })
  }

  render() {
    const { type } = this.state;

    const styles = {
      _page: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        border: '2px solid white',
        background: '#2F2F2F'
      },
  
      _form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        height: '90vh'
      },
  
      _logo: {
        height: '50vh'
      },
  
      _header: {
        fontSize: '3rem',
        color: 'white',
        fontFamily: "'Pirata One', cursive"
      },
  
      _subheader: {
        fontSize: '1.3rem',
        color: 'white',
      },
  
      _input: {
        background: 'unset',
        fontSize: '1.1rem',
        color: 'white',
        padding: '3px 5px',
        width: '60%'
      },
  
      _buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '60%'
      },
  
      _button: {
        width: '45%',
        height: '25px',
        background: '#F1DBB1',
        fontSize: '1.1rem',
        cursor: 'pointer'
      }
    }

    const { _page, _form, _logo, _header, _subheader, _input, _button, _buttons } = styles;

    return (
      <div style = { _page }>
        <form 
          style = { _form }
          onSubmit = { e => this.handleSubmit(e) }
        >
          <img 
            style = { _logo }
            src = { logo } 
          />
          <h1 style = { _header }>Welcome</h1>
          <h2 style = { _subheader }>Please Log In or Sign Up</h2>
          { type === 'login' ? 
            <>
              <input 
                placeholder="Username" 
                onChange = { this.handleChange }
                value = { this.state.username }
                style = { _input }
              />
              <input 
                placeholder="Password"
                onChange = { this.handleChange }
                value = { this.state.password }
                style = { _input }
              />
              <div style = { _buttons }>
                <button 
                  style = { _button }
                  onClick = { () => this.changeType('signup') }
                >
                  Sign Up
                </button>
                <input 
                  style = { _button }
                  type="submit"
                  value="Set Sail!"
                />
              </div>
            </>
          :
            <>
              <input 
                placeholder="Email" 
                onChange = { this.handleChange }
                value = { this.state.email }
                style = { _input }
              />
              <input 
                placeholder="Username"
                onChange = { this.handleChange }
                value = { this.state.username }
                style = { _input }
              />
              <input 
                placeholder="Password"
                onChange = { this.handleChange }
                value = { this.state.password }
                style = { _input }
              />
              <div style = { _buttons }>
                <button 
                  style = { _button }
                  onClick = { () => this.changeType('login') }
                >
                  Log In
                </button>
                <input 
                  style = { _button }
                  type="submit"
                  value="Set Sail!"
                />
              </div>
            </>
          }
        </form>
      </div>
    )
  }
}