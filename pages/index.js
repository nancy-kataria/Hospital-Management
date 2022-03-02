import React from "react";
import styles from "../styles/Home.module.css";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Link from "next/link";

function Home() {
  return (
    <form id="form" className={styles.login}>
      <div className={styles.tagline}>
        <h1>The Spirit of caring</h1>
        <h1>close to Home.</h1>
      </div>
      <div className={styles.loginPanel}>
        <div className={styles.loginField}>
          <TextField
            className={styles.textfield}
            id="outlined-basic"
            label="UserName"
            variant="outlined"
          />
        </div>
        <div className={styles.loginField}>
          <TextField
            className={styles.textfield}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
        </div>
        <div className={styles.loginField}>
          <Link href="/Portal" passHref>
            <Button component="a" variant="contained" id={styles.loginButton}>
              Log In
            </Button>
          </Link>
        </div>
        <hr></hr>
        <p>Don't have an account? Make one</p>
        <div className={styles.loginField}>
          <Button type="submit" variant="contained" id={styles.signupButton}>
            Sign Up
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Home;
