import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import MyProfile from "./pages/MyProfile/MyProfile";
import Profile from "./pages/Profile/Profile";
import AvatarSetup from "./pages/AvatarSetup/AvatarSetup";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Admin from "./pages/Admin/Admin";
import Error from "./pages/Error/Error";
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
