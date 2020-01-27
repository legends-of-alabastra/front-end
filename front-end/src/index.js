import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import DjangoCSRFToken from 'django-react-csrftoken'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}



// const csrfToken = getCookie('csrftoken')

// cookies.set("csrftoken", csrfToken, { path: '/' });

const Todo = props => {
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
  
    function validateForm() {
      return username.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event) {
      event.preventDefault();

      let loginCreds = {
        username: username,
        password: password
      }

      // console.log(loginCreds)
      axios
        .post("https://alabastraapp.herokuapp.com/api/auth/login", loginCreds)
        .then(res =>{
            // console.log(res.data)
            localStorage.setItem('token', res.data.token)
            // console.log(res, 'success!')
        })
        .catch(err => {
            // console.log(err, 'sorry bro')
        })
    }

    function logout() {
        axios.get('http://127.0.0.1:8000/api/auth/user')
          .then(res => {
            console.log(res.data)
          })
          .catch(err => {
            console.log(err)
          })
      }

    return (
        <div className="Login">
        <form onSubmit={handleSubmit}>
         <Form.Group controlId="username" bsSize="large">
            <h3>username</h3>
            <Form.Control
              autoFocus
              type="username"
              name = "username"
              value={username}
              onChange={e => setusername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" bsSize="large">
            <h2>Password</h2>
            <Form.Control
              value={password}
              name = "password"
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </Form.Group>
          <Button block bsSize="large" disabled={!validateForm()} type="submit">
            Login
          </Button>
          <Button block bsSize="large" onClick = {logout} type="submit">
            Logout
          </Button>
          
         </form>
      </div>
    )
}

ReactDOM.render(<Todo />, document.getElementById('root'));
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

