import "../styles/globals.css";
import AppContext from "../context/AppContext";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
