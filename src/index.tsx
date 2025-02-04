import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./reset.css"
import "./root.css"
import "./limbus/Header.css"
import "./limbus/IdentityDictionary/css/IdentityInformation.css"
import "./limbus/IdentityDictionary/css/IdentityInformationProfile.css"
import "./limbus/IdentityDictionary/css/IdentityInformationTabs.css"
import "./limbus/IdentityDictionary/css/IdentityInformationInfos.css"
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
