import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () =>{
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
