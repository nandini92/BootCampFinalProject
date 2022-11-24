import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

import Avatars from "./Avatars";

import styled from "styled-components";

const AvatarSetup = () => {
  const { user } = useContext(UserContext);
  const [startingAvatars, setStartingAvatars] = useState();

  // Render the image in a React component.
  return (
    <Wrapper>
      <Title>Choose a companion for your quests!</Title>
      <Grid>
        <Avatars
          startingAvatars={startingAvatars}
          setStartingAvatars={setStartingAvatars}
        />
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 210px;
  width: 99vw;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  font-size: 30px;
  color: var(--color-dark-grey);
  align-self: center;
  padding-bottom: 50px;
`;
const Grid = styled.div`
  align-self: center;
  width: 88%;
  display: grid;
  grid-template-columns: repeat(10, minmax(8px, 1fr));
  gap: 1vw;
`;
export default AvatarSetup;
