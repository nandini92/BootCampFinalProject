import { createContext, useEffect, useState } from "react";
import { Auth0Provider } from "@auth0/auth0-react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const cred = {
    domain: process.env.REACT_APP_AUTH0_DOM,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
    googleMaps: process.env.REACT_APP_GOOGLE_MAPS_API,
    cloudinary: process.env.REACT_APP_CLOUDINARY_URL,
    cloudName: process.env.REACT_APP_CLOUD_NAME,
  };

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
