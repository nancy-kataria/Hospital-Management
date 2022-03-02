import Header from "../Components/Header";
import "../styles/globals.css";
import "../Components/Navbar.css";
import '../Components/components.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
