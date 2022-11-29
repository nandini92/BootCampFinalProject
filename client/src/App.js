import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import Home from "./components/Home";
import MyProfile from "./components/MyProfile";
import Profile from "./components/Profile";
import AvatarSetup from "./components/AvatarSetup";

const App = () => {
  const { isLoading, error } = useAuth0();
  return (
    <BrowserRouter>
      <GlobalStyles />
      <div>
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && (
          <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/avatar" element={<AvatarSetup />} />
          </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
