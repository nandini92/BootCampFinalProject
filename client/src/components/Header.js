import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";

import { AdvancedImage } from "@cloudinary/react";

import LoginButton from "../assets/LoginButton";
import LogoutButton from "../assets/LogoutButton";
import pokeball from "../assets/images/pokeball.svg";
import logo from "../assets/images/Quest.png";

const Header = () => {
  const { userAvatar } = useContext(UserContext);

  return (
    <Wrapper>
      <NavLink to={"/"}><Logo src={logo} /></NavLink>
      {userAvatar
      ? <AvatarWrapper to={"/my-profile"}>
        <Pokemon cldImg={userAvatar} />
      </AvatarWrapper>
      : <Pokeball>
        <Image src={pokeball} alt="pokeball"/>
        </Pokeball>
      }
      <SignInOut>
        <LoginButton />
        <LogoutButton />
      </SignInOut>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 0 0 0;
  background-color: var(--color-purple);
  box-shadow: 0px 0px 5px 2px var(--color-dark-grey);
  height: 100px;
  width: 100vw;
  position: absolute;
  z-index: 10;
`;
const Logo = styled.img`
  position: absolute;
  height: 170px;
`;
const SignInOut = styled.div`
  position: absolute;
  top: 30px;
  right: 50px;
`;
const AvatarWrapper = styled(NavLink)`
  position: absolute;
  top: 24px;
left: calc(50vw - (150px/2));
  border-radius: 50%;
  background-color: var(--color-grey);
  box-shadow: 2px 5px 10px var(--color-dark-grey);
  height: 150px;
  width: 150px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
const Pokemon = styled(AdvancedImage)`
  position: relative;
  top: 17px;
  left: 26px;
  height: 90px;
  width: 90px;
`;
const Pokeball = styled.div`
  position: absolute;
  top: 24px;
  left: calc(50vw - (150px/2));
  border-radius: 50%;
  background-color: white;
  box-shadow: 2px 5px 10px var(--color-purple);
  height: 150px;
  width: 150px;
`;

const Image = styled.img`
  height: 157px;
  width: 157px;
  position: relative;
  top: -2px;
  left: -4px;
  z-index: 100;
`;
export default Header;
