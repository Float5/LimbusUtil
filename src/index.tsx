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
import "./limbus/IdentityDictionary/css/IdentityDictionary.css"
import "./limbus/IdentityDictionary/css/IdentityDictionaryFilter.css"
import "./limbus/IdentityDictionary/css/IdentityDictionaryList.css"
import { HelmetProvider } from "react-helmet-async";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </HashRouter>
  </React.StrictMode>
);
