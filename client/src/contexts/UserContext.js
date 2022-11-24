import { createContext, useEffect, useState } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [cred, setCred] = useState();
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    fetch("/cred")
      .then((res) => res.json())
      .then((data) => {
        setCred(data);
      });
  }, []);

  const fetchUserDetails = () => {
    // Auth0 method to verify if authentication is successful. If truthy, user details will be returned.
    return isAuthenticated && user;
  }

  return (
    <UserContext.Provider value={{cred, actions : {fetchUserDetails}}}>
      { cred &&
        <Auth0Provider
        domain={cred.domain}
        clientId={cred.clientId}
        redirectUri={window.location.origin}
      >
        {children}
      </Auth0Provider>}
    </UserContext.Provider>
  );
};
