import { Button } from "@material-ui/core";
import Link from "next/link";

function Header() {
  return (
    <div className="header">
      <div className="header-left"></div>
      <div className="header-center"></div>
      <div className="header-right">
        <Link href="/" passHref>
          <Button component="a" variant="text" className="header-buttons">
            Log In
          </Button>
        </Link>
        <Link href="/" passHref>
          <Button component="a" variant="text" className="header-buttons">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
