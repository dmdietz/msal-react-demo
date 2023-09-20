import { ProfileData } from "../components/ProfileData";
import { BrowserAuthError, InteractionType } from "@azure/msal-browser";
import { useMsalAuthentication } from "@azure/msal-react";
import { useState, useEffect } from "react";
import { fetchData } from "../fetch";

export const Profile = () => {
  const [graphData, setGraphData] = useState(null);
  const { result, error, login } = useMsalAuthentication(
    InteractionType.Popup,
    {
      scopes: ["user.read"],
      claims: sessionStorage.getItem("claimsChallenge")
        ? window.atob(sessionStorage.getItem("claimsChallenge"))
        : undefined,
    }
  );

  useEffect(() => {
    if (!!graphData) {
      return;
    }

    if (!!error) {
      if (error instanceof BrowserAuthError) {
        login(InteractionType.Redirect, {
          scopes: ["user.read"]
        });
      }
      console.log(error);
    }

    if (result) {
      fetchData("https://graph.microsoft.com/v1.0/me", result.accessToken)
        .then((response) => setGraphData(response))
        .catch((error) => console.log(error));
    }
  }, [error, graphData, login, result]);
  return <>{graphData ? <ProfileData graphData={graphData} /> : null}</>;
};
