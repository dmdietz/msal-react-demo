import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

import {
  PublicClientApplication,
  EventType,
  LogLevel,
} from "@azure/msal-browser";

const pca = new PublicClientApplication({
  auth: {
    clientId: "5c93146f-81dc-4571-9ef6-91f30d19ad1e",
    authority:
      "https://login.microsoftonline.com/29082779-76f5-496c-8672-1f8544019d34",
    redirectUri: "/",
    postLogoutRedirectUri: "/",
    clientCapabilities: ["CP1"],
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPII) => {
        console.log(message);
      },
      logLevel: LogLevel.Info,
    },
  },
});

pca.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    pca.setActiveAccount(event.payload.account);
  } else if (event.eventType === EventType.LOGOUT_SUCCESS) {
    pca.setActiveAccount(null);
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App msalInstance={pca} />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
