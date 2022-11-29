import { createContext, useEffect, useState } from "react";
import { Auth0Provider } from "@auth0/auth0-react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cred, setCred] = useState();

  // Retrieves all API credentials from server
  useEffect(() => {
    fetch("/cred")
      .then((res) => res.json())
      .then((data) => {
        setCred(data);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ cred }}>
      {cred && (
        <Auth0Provider
          domain={cred.domain}
          clientId={cred.clientId}
          redirectUri={window.location.origin}
        >
          {children}
        </Auth0Provider>
      )}
    </AuthContext.Provider>
  );
};
