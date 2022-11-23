import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import GlobalStyles from "./GlobalStyles";
import Profile from "./components/Profile";
import Header from "./components/Header";

import LoginButton from "./assets/LoginButton";
import LogoutButton from "./assets/LogoutButton";

const App = () => {
  const { isLoading, error } = useAuth0();
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <div>
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && (
          <>
          </>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
