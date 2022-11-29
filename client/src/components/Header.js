import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";

import { AdvancedImage } from "@cloudinary/react";

import LoginButton from "../assets/LoginButton";
import LogoutButton from "../assets/LogoutButton";
import pokeball from "../assets/images/pokeball.svg";

const Header = () => {
  const { userAvatar } = useContext(UserContext);

  return (
    <Wrapper>
      <Home to={"/"}>Quest</Home>
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
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 10;
`;
const Logo = styled.img`
  height: 150px;
  width: 250px;
`;
const Home = styled(NavLink)`
  font-size: 48px;
  font-weight: 300;
  text-decoration: none;
  color: var(--color-grey);
  align-self: center;
  padding-left: 20px;
`;
const SignInOut = styled.div`
  align-self: center;
  padding-right: 20px;
`;
const AvatarWrapper = styled(NavLink)`
  margin-top: 24px;
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
  position: relative;
  right: 25px;
  margin-top: 24px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 2px 5px 10px var(--color-purple);
  height: 150px;
  width: 150px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
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
