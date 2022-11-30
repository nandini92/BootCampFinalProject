import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import Home from "./components/Home";
import MyProfile from "./components/MyProfile";
import Profile from "./components/Profile";
import AvatarSetup from "./components/AvatarSetup";
import Error from "./components/Error";
import Loading from "./components/Loading";

const App = () => {
  const { isLoading, error } = useAuth0();
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
            {/* TO DO: The following pages should not be accessible to non-logged in user */}
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/avatar" element={<AvatarSetup />} />
            {/* TO DO: ERROR PAGE */}
            <Route path="/error" element={<Error />} />
          </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
