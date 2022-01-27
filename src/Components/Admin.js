import React, { useState } from "react";
import { Button } from "@material-ui/core";
import DoctorList from "./DoctorList";
import StaffList from "./StaffList";
import AdminList from "./AdminList";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";
import DoctorChart from "./DoctorChart";
import StaffChart from "./StaffChart";

function Admin() {
  const [doctorList, setDoctorList] = useState(true);
  const [staffList, setStaffList] = useState(false);
  const [adminList, setAdminList] = useState(false);

  const doctorListHandler = () => {
    setStaffList(false);
    setAdminList(false);
    setDoctorList(true);
  };

  const staffListHandler = () => {
    setDoctorList(false);
    setAdminList(false);
    setStaffList(true);
  };

  const adminListHandler = () => {
    setDoctorList(false);
    setStaffList(false);
    setAdminList(true);
  };

  return (
    <div className="admin">
      <Link to="/portal">
        <Button variant="text">
          <ArrowBack /> Back to Portal
        </Button>
      </Link>
      <div className="list-choice">
        <div className="list-selection">
          <Button
            variant="contained"
            className="portal-button"
            onClick={doctorListHandler}
          >
            List of Doctors
          </Button>
        </div>
        <div className="list-selection">
          <Button
            variant="contained"
            className="portal-button"
            onClick={staffListHandler}
          >
            List of Staff Members
          </Button>
        </div>
        <div className="list-selection">
          <Button
            variant="contained"
            className="portal-button"
            onClick={adminListHandler}
          >
            List of Admins
          </Button>
        </div>
      </div>
      {doctorList && (
        <div className="list">
          <div className="list-name">
            <h1>List of Doctors</h1>
          </div>
          <DoctorList roleType="admin" />
          <DoctorChart />
        </div>
      )}
      {staffList && (
        <div className="list">
          <div className="list-name">
            <h1>List of Staff Members</h1>
          </div>
          <StaffList roleType="admin" />
          <StaffChart />
        </div>
      )}
      {adminList && (
        <div className="list">
          <div className="list-name">
            <h1>List of Admins</h1>
          </div>
          <AdminList roleType="admin" />
        </div>
      )}
    </div>
  );
}

export default Admin;
