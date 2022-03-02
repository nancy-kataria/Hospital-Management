import React, { useState } from "react";
import { Button } from "@material-ui/core";
import DoctorList from "../Components/DoctorList";
import StaffList from "../Components/StaffList";
import AdminList from "../Components/AdminList";
import { ArrowBack } from "@material-ui/icons";
import DoctorChart from "../Components/DoctorChart";
import StaffChart from "../Components/StaffChart";
import styles from "../styles/Home.module.css";
import Link from "next/link";

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
    <div className={styles.admin}>
      <Link href="/Portal" passHref>
        <Button component="a" variant="text">
          <ArrowBack /> Back to Portal
        </Button>
      </Link>
      <div className={styles.listChoice}>
        <div className={styles.listSelection}>
          <Button
            variant="contained"
            className={styles.portalButton}
            onClick={doctorListHandler}
          >
            List of Doctors
          </Button>
        </div>
        <div className={styles.listSelection}>
          <Button
            variant="contained"
            className={styles.portalButton}
            onClick={staffListHandler}
          >
            List of Staff Members
          </Button>
        </div>
        <div className={styles.listSelection}>
          <Button
            variant="contained"
            className={styles.portalButton}
            onClick={adminListHandler}
          >
            List of Admins
          </Button>
        </div>
      </div>
      {doctorList && (
        <div className={styles.list}>
          <div className={styles.listName}>
            <h1>List of Doctors</h1>
          </div>
          <DoctorList roleType="admin" />
          <DoctorChart />
        </div>
      )}
      {staffList && (
        <div className={styles.list}>
          <div className={styles.listName}>
            <h1>List of Staff Members</h1>
          </div>
          <StaffList roleType="admin" />
          <StaffChart />
        </div>
      )}
      {adminList && (
        <div className={styles.list}>
          <div className={styles.listName}>
            <h1>List of Admins</h1>
          </div>
          <AdminList roleType="admin" />
        </div>
      )}
    </div>
  );
}

export default Admin;
