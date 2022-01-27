import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header-left"></div>
      <div className="header-center">
        {/* <Button variant="text" className="header-buttons">
          Home
        </Button>
        <Button variant="text" className="header-buttons">
          Profile
        </Button>
        <Button variant="text" className="header-buttons">
          About
        </Button>
        <Button variant="text" className="header-buttons">
          Contact
        </Button> */}
      </div>
      <div className="header-right">
        <Link to="/">
          <Button variant="text" className="header-buttons">
            Log In
          </Button>
        </Link>
        <Link to="/">
          <Button variant="text" className="header-buttons">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
