export const fetchData = (endpoint, accessToken) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(endpoint, options)
    .then((response) => handleClaimsChallenge(response))
    .catch((error) => console.log(error));
};

const handleClaimsChallenge = (response) => {
  if (response.status === 200) {
    return response.json();
  } else if (response.status === 401) {
    if (response.headers.get("www-authenticate")) {
      const authenticateHeader = response.headers.get("www-authenticate");
      const claimsChallenge = parseChallenges(authenticateHeader).claims;

      sessionStorage.setItem("claimsChallenge", claimsChallenge);
      return;
    }

    throw new Error(`Error ${response.status}`);
  } else {
    throw new Error(`Error ${response.status}`);
  }
};

const parseChallenges = (header) => {
  const schemeSeparator = header.indexOf(" ");
  const challenges = header.substring(schemeSeparator + 1).split(",");
  const challengeMap = {};

  challenges.forEach((challenge) => {
    const [key, value] = challenge.split("=");
    challengeMap[key.trim()] = window.decodeURI(value.replace(/['"]+/g, ""));
  });

  return challengeMap;
};
