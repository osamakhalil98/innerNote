import "../styles/globals.css";
import AppContext from "./AppContext";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
