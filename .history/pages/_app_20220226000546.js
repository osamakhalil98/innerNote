import "../styles/globals.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Provider} from "react-redux"
import store from "../redux/index"

function MyApp({ Component, pageProps }) {
  return (
   
    <>
    <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
      </>
  );
}

export default MyApp;
