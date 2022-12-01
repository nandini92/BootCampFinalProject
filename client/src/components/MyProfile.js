import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AdvancedImage } from "@cloudinary/react";
import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { UserContext } from "../contexts/UserContext";

import QuestAdmin from "./QuestAdmin";
import QuestList from "./QuestList";
import UserRatings from "./UserRatings";

const MyProfile = () => {
  const { loggedIn, userQuests, userAvatar } = useContext(UserContext);
  const navigate = useNavigate();

  // Set theme for ThemeProvider. This will be used for circular progress color palette
  const theme = createTheme({
    palette: {
      primary: {
        main: '#60D394',
      }
    },
  });

  if (loggedIn && userAvatar) {
    return (
      <>
        <Wrapper>
          <Body>
            <UserDetails>
              <Info>
              <Title>{loggedIn.handler}</Title>
              {userAvatar && (
                <AvatarWrapper>
                  <Pokemon cldImg={userAvatar} />
                  {loggedIn.taskPoints &&
                  <ThemeProvider theme={theme}>
                    <LevelProgress variant="determinate" value={loggedIn.taskPoints % 100} size="180px" color="primary" />
                  </ThemeProvider>
                  }
                </AvatarWrapper>
              )}
              <p>{userAvatar.publicID
                    .split("/")[2]
                    .split("_")[0]
                    .toUpperCase()}{" "}</p>
              <p>LEVEL {loggedIn.level} : KARMA {loggedIn.karma}</p>
              </Info>
              <Info>
                <UserRatings category="charisma" ratings={null} currentRatings={loggedIn.ratings?.charisma}/>
                <UserRatings category="intelligence" ratings={null} currentRatings={loggedIn.ratings?.intelligence}/>
                <UserRatings category="wisdom" ratings={null} currentRatings={loggedIn.ratings?.wisdom}/>
                <UserRatings category="dexterity" ratings={null} currentRatings={loggedIn.ratings?.dexterity}/>
                <UserRatings category="strength" ratings={null} currentRatings={loggedIn.ratings?.strength}/>
              </Info>
              </UserDetails>
            <Panels>
            {userQuests && 
            <>
              <Panel>
              <SubTitle>My Quests</SubTitle>
              {userQuests.questsOwned.length === 0
              ?<MissingQuest>
                <Button onClick={() => navigate("/")}>CLICK TO CREATE A QUEST!</Button>
              </MissingQuest>
              :<MyQuests>
                  <QuestAdmin quests={userQuests.questsOwned} />
                </MyQuests>
              }
              </Panel>
              <Panel>
              <SubTitle>Quests I'm on</SubTitle>
              {userQuests.questsOn.length === 0
              ?<MissingQuest>
                <Button onClick={() => navigate("/")}>CLICK TO JOIN A QUEST!</Button>
              </MissingQuest>
              :<MyQuests>
                <QuestList quests={userQuests.questsOn} setSelectedQuest={null} />
              </MyQuests>
              }
              </Panel>
            </>
            }
            </Panels>
          </Body>
        </Wrapper>
      </>
    );
  }
};

// FONTS
const Title = styled.h2`
  font-size: 26px;
  font-weight: 500;
  color: var(--color-dark-grey);
  margin-bottom: 15px;
`;
const SubTitle = styled.p`
  text-align: center;
  font-size: 24px;
  color: var(--color-dark-grey);
`;

// DIVS
const Wrapper = styled.div`
  position: absolute;
  top: 200px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font);
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
`;
const UserDetails = styled.div`
  align-self: center;
  display: flex;
  width: 50%;
  min-width: 650px;
  height: 50%;
  justify-content: space-evenly;
  border-radius: 15px;
  background: linear-gradient(120deg, white, var(--color-blue));
  box-shadow: 2px 5px 10px var(--color-purple);
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-dark-grey);
  font-size: 20px;
  margin: 20px;

  p {
    text-align: center;
    margin: 3px;
  }
`;
const AvatarWrapper = styled.div`
  align-self: center;
  margin: 20px 0px;
  border-radius: 50%;
  background-color: var(--color-grey);
  border: 5px solid var(--color-grey);
  box-shadow: 0px 0px 10px var(--color-purple);
  height: 180px;
  width: 180px;
`;
const Panels = styled.div`
width: 100%;
height: 50%;
display: flex;
justify-content: space-between;
`
const Panel = styled.div`
  width: 100%;
  margin:35px;
`
const MyQuests = styled.div`
  width: 100%;
  max-height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  margin: 20px;
  box-shadow: 0px 0px 10px var(--color-purple);
  overflow: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;
const MissingQuest = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 0px 0px 10px var(--color-purple);
  margin: 20px;
`;

// IMAGES
const Pokemon = styled(AdvancedImage)`
  position: relative;
  top: 17px;
  left: 25px;
  height: 120px;
  width: 120px;
`;

// MISC
const LevelProgress = styled(CircularProgress)`
  position: relative;
  bottom: 128px;
  right: 5px;
`
const Button = styled.button`
  border-radius: 15px;
  height: 100px;
  width: 90%;
  align-self: center;
  margin: 20px;

  &:hover {
    cursor: pointer;
  }
`
export default MyProfile;
