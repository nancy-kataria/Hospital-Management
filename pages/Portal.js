import React from "react";
import { Button } from "@material-ui/core";
import styles from '../styles/Home.module.css'
import Link from "next/link";

function Portal() {
  return (
    <div className={styles.portal}>
      <div className={styles.portalPanel}>
        <h2>LOGIN PORTAL</h2>
        <div className={styles.portalSelection}>
          <Link href='/Admin' passHref>
          <Button component="a" variant="contained" className={styles.portalButton}>
              Admin
            </Button>
          </Link>
        </div>
        <div className={styles.portalSelection}>
          <Link href="/Staff" passHref>
            <Button component="a" variant="contained" className={styles.portalButton}>
              Staff
            </Button>
          </Link>
        </div>
        <div className={styles.portalSelection}>
          <Link href="/Doctor" passHref>
            <Button component="a" variant="contained" className={styles.portalButton}>
              Doctor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Portal;
