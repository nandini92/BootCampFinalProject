import LoginButton from "./assets/LoginButton";
import LogoutButton from "./assets/LogoutButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { isLoading, error } = useAuth0();
  return (
    <>
      <div>
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && (
          <>
            <LoginButton />
            <LogoutButton />
            <Profile />
          </>
        )}
      </div>
    </>
  );
};

export default App;
