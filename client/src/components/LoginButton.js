import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () =>{
    // loginWithRedirect : function returned by Auth0 to redirect back to sign in page once authenticated
    // isAuthenticated : bool returned by Auth0 on whether user has signed in + authenticated
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        !isAuthenticated &&
        <Button onClick={() => loginWithRedirect()}>
            Sign In
        </Button>
    )
}

const Button = styled.button`
    &:hover {
        cursor: pointer;
    }
`;
export default LoginButton;
