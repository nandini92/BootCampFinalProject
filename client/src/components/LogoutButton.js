import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";

const LogoutButton = () =>{
    // setLoggedIn : func to set loggedIn state. When user is signed In, parameter stores user details shared through out app. When signed out, restricts access to pages other than Home and welcome.
    const { actions: {setLoggedIn} } = useContext(UserContext);

    // logout : function returned by Auth0 to unset authenticated user cookies
    // isAuthenticated : bool returned by Auth0 on whether user has signed in + authenticated
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated &&
        <Button onClick={() => {
            setLoggedIn(false);
            logout();
            }}>
            Sign Out
        </Button>
    )
}

const Button = styled.button`
    &:hover {
        cursor: pointer;
    }
`;
export default LogoutButton;