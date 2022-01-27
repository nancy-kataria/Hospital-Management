import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function Portal() {
  return (
    <div className="portal">
      <div className="portal-panel">
        <h2>LOGIN PORTAL</h2>
        <div className="portal-selection">
          <Link to="/admin">
            <Button variant="contained" className="portal-button">
              Admin
            </Button>
          </Link>
        </div>
        <div className="portal-selection">
          <Link to="/staff">
            <Button variant="contained" className="portal-button">
              Staff
            </Button>
          </Link>
        </div>
        <div className="portal-selection">
          <Link to="/doctor">
            <Button variant="contained" className="portal-button">
              Doctor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Portal;
