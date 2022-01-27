import React from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import {Link} from 'react-router-dom'

function Login() {
  return (
    <div className="login">
      <div className="tagline">
        <h1>The Spirit of caring</h1>
        <h1>close to Home.</h1>
      </div>
      <div className="login-panel">
        <div className="login-field">
          <TextField
            className="textfield"
            id="outlined-basic"
            label="UserName"
            variant="outlined"
          />
        </div>
        <div className="login-field">
          <TextField
            className="textfield"
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
        </div>
        <div className="login-field">
          <Link to='/portal'>
          <Button variant="contained" id="login-button">
            Log In
          </Button>
          </Link>
        </div>
        <hr></hr>
        <p>Don't have an account? Make one</p>
        <div className="login-field">
          <Button variant="contained" id="signup-button">
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
