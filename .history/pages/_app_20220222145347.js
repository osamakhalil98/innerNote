import "../styles/globals.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import AppContext from "../context/AppContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppContext.Provider>
      {" "}
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
