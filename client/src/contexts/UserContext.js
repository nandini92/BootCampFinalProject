import { createContext, useEffect, useState } from "react";
import { Auth0Provider } from "@auth0/auth0-react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [signedInUser, setSignedInUser] = useState();

  useEffect(() => {
    fetch("/cred")
      .then((res) => res.json())
      .then((data) => {
        setSignedInUser(data);
      });
  }, []);

  return (
    <UserContext.Provider>
      { signedInUser &&
        <Auth0Provider
        domain={signedInUser.domain}
        clientId={signedInUser.clientId}
        redirectUri={window.location.origin}
      >
        {children}
      </Auth0Provider>}
    </UserContext.Provider>
  );
};
