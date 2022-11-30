import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";

const LogoutButton = () =>{
    const { actions: {setLoggedIn} } = useContext(UserContext);
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated &&
        <Button onClick={() => {
            setLoggedIn();
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