import "../styles/globals.css";
import AppContext from "../context/AppContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppContext.Provider>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter"
        rel="stylesheet"
      ></link>{" "}
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
