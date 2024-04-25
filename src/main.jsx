import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
//import AuthProvider from "./context/AuthProvider.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
//import store from "./redux/store.js";
import store from "./redux-toolkit/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <AuthProvider>
  <Provider store={store}>
    <App />
  </Provider>
  //</AuthProvider>
);
