import { useContext, useState } from "react";
import styled from "styled-components";
import { AdvancedImage } from "@cloudinary/react";
import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { UserContext } from "../contexts/UserContext";

import QuestAdmin from "./QuestAdmin";
import QuestList from "./QuestList";
import UserRatings from "./UserRatings";

const MyProfile = () => {
  // TO FIX: When navigating directly to profile. User context is undefined. Why?
  const { user, userQuests, userAvatar } = useContext(UserContext);
  const [ratings, setRatings] = useState();

  // Set theme for ThemeProvider. This will be used for circular progress color palette
  const theme = createTheme({
    palette: {
      primary: {
        main: '#60D394',
      }
    },
  });

  if (user && userAvatar) {
    return (
      <>
        <Wrapper>
          <Title>Hi {user.handler} !</Title>
          <Body>
            <UserDetails>
              <Info>
              {userAvatar && (
                <AvatarWrapper className="front">
                  <Pokemon cldImg={userAvatar} />
                  <ThemeProvider theme={theme}>
                    <LevelProgress variant="determinate" value={user.taskPoints} size="180px" color="primary" />
                  </ThemeProvider>
                </AvatarWrapper>
              )}
              <p>{userAvatar.publicID
                    .split("/")[2]
                    .split("_")[0]
                    .toUpperCase()}{" "}</p>
              <p>LEVEL {user.level} : KARMA {user.karma}</p>
              </Info>
              <Info>
                <UserRatings category="charisma" ratings={ratings} setRatings={null}/>
                <UserRatings category="intelligence" ratings={ratings} setRatings={null}/>
                <UserRatings category="wisdom" ratings={ratings} setRatings={null}/>
                <UserRatings category="dexterity" ratings={ratings} setRatings={null}/>
                <UserRatings category="strength" ratings={ratings} setRatings={null}/>
              </Info>
              </UserDetails>
            <Panels>
            {userQuests.questsOwned && 
              <Panel>
                <SubTitle>Quests I own:</SubTitle>
                <MyQuests>
                  <QuestAdmin quests={userQuests.questsOwned} />
                </MyQuests>
              </Panel>
            }
            {userQuests.questsOn && (
              <Panel>
              <SubTitle>Quests I'm on:</SubTitle>
                <MyQuests>
                  <QuestList quests={userQuests.questsOn} setSelectedQuest={null} />
                </MyQuests>
              </Panel>
            )}
            </Panels>
          </Body>
        </Wrapper>
      </>
    );
  }
};

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
  justify-content: space-between;
  width: 90%;
`;
const Title = styled.h2`
  font-size: 30px;
  color: var(--color-dark-grey);
  margin: 30px 0px 40px 0px;
`;
const SubTitle = styled.p`
  font-size: 26px;
  color: var(--color-dark-grey);
  margin-bottom: 25px;
  text-align: left;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--color-dark-grey);
  font-size: 22px;
  margin: 25px;
  p {
    text-align: center;
    margin: 3px;
  }
`;
const UserDetails = styled.div`
display: flex;
width: 45%;
height: 50%;
justify-content: space-evenly;
border-radius: 15px;
background-color: var(--color-grey);
box-shadow: 2px 5px 10px var(--color-purple);
`;
const AvatarWrapper = styled.div`
  align-self: center;
  margin: 20px 0px;
  border-radius: 50%;
  background-color: var(--color-frey);
  box-shadow: 0px 0px 10px var(--color-purple);
  height: 180px;
  width: 180px;
`;
const LevelProgress = styled(CircularProgress)`
  position: relative;
  bottom: 125px;
  left: 0px;
`
const Pokemon = styled(AdvancedImage)`
  position: relative;
  top: 17px;
  left: 25px;
  height: 120px;
  width: 120px;
`;
const Panels = styled.div`
width: 50%;
height: 50vh;
display: flex;
flex-direction: column;
justify-content: space-between;
`
const Panel = styled.div`
width: 90%;
`
const MyQuests = styled.div`
  width: 100%;
  max-height: 16vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  box-shadow: 0px 0px 10px var(--color-purple);
  overflow: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;

export default MyProfile;
