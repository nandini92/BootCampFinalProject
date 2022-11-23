import { NavLink } from "react-router-dom";
import styled from "styled-components";

import LoginButton from "../assets/LoginButton";
import LogoutButton from "../assets/LogoutButton";

const Header = () => {
  return (
    <Wrapper>
      <Home to={"/"}>Quest</Home>
      <AvatarWrapper className="front">
        <Shine></Shine>
        <Pokemon
          src="https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif"
          alt="Bulbasaur"
        />
      </AvatarWrapper>
      <SignInOut>
        <LoginButton />
        <LogoutButton />
      </SignInOut>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 0 0 0;
  background-color: #363b81;
  height: 100px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
`;
const Home = styled(NavLink)`
  font-size: 48px;
  text-decoration: none;
  color: white;
  align-self: center;
`;
const SignInOut = styled.div`
  align-self: center;
`;
const AvatarWrapper = styled.div`
  margin-top: 10px;
  border: 5px solid #fbd743;
  border-radius: 50%;
  background-color: #ff1f1f;
  box-shadow: 2px 5px 10px #363b81;
  height: 150px;
  width: 150px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
const Shine = styled.div`
  position: relative;
  top: 30px;
  left: 100px;
  z-index: 100;
  background-color: white;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  box-shadow: 0px 0px 12px 10px white;
`;
const Pokemon = styled.img`
  position: relative;
  top: 15px;
  left: 35px;
  height: 90px;
  width: 90px;
`;

export default Header;
