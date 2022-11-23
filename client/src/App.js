import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import Home from "./components/Home";

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
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
