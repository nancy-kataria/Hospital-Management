import React from "react";
import PatientList from "./PatientList";
import { Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";
import PatientChart from "./PatientChart";

function Doctor() {
  return (
    <div className="list">
      <Link to="/portal">
        <Button variant="text">
          <ArrowBack /> Back to Portal
        </Button>
      </Link>
      <div className="list-name">
        <h1>List of Patients</h1>
      </div>
      <PatientList />
      <PatientChart />
    </div>
  );
}

export default Doctor;
