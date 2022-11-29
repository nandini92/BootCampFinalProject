import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../contexts/UserContext";

const LogoutButton = () =>{
    const { actions: {setLoggedIn} } = useContext(UserContext);
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated &&
        <button onClick={() => {
            setLoggedIn();
            logout();
            }}>
            Sign Out
        </button>
    )
}

export default LogoutButton;