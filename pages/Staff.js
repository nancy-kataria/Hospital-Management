import React from "react";
import PatientList from "../Components/PatientList";
import { Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import PatientChart from "../Components/PatientChart";
import styles from "../styles/Home.module.css";
import Link from "next/link";

function Staff() {
  return (
    <div className={styles.list}>
      <Link href="/Portal" passHref>
        <Button component="a" variant="text">
          <ArrowBack /> Back to Portal
        </Button>
      </Link>
      <div className={styles.listName}>
        <h1>List of Patients</h1>
      </div>
      <PatientList roleType="staff" />
      <PatientChart />
    </div>
  );
}

export default Staff;
