import React from "react"; 
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import App from "./App";
import store from "./store";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider> 
  </React.StrictMode>
);

