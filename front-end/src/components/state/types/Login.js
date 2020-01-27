import React, { useState } from "react";
import { Button, FormGroup, FormControl, h2 } from "react-bootstrap";
import "./Login.css";

function Login(props) {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <Form.Group controlId="username" bsSize="large">
          <h2>username</h2>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={e => setusername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" bsSize="large">
          <h2>Password</h2>
          <Form.Control
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </Form.Group>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}