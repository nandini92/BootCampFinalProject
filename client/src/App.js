import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import Home from "./components/Home";
import MyProfile from "./components/MyProfile";
import Profile from "./components/Profile";
import AvatarSetup from "./components/AvatarSetup";
import Leaderboard from "./components/Leaderboard";
import Admin from "./components/Admin";
import Error from "./components/Error";
import Loading from "./components/Loading";

const App = () => {
  const { isLoading, error, isAuthenticated } = useAuth0();
  return (
    <BrowserRouter>
      <GlobalStyles />
      <div>
        {error && <Error />}
        {!error && isLoading && <Loading />}
        {!error && !isLoading && (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              {isAuthenticated && (
                <>
                  <Route path="/my-profile" element={<MyProfile />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/avatar" element={<AvatarSetup />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/admin" element={<Admin />} />
                </>
              )}
              <Route path="*" element={<Error />} />
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
