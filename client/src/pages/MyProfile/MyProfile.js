import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AdvancedImage } from "@cloudinary/react";
import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Dialog } from "@material-ui/core";
import Tippy from '@tippyjs/react';

import { UserContext } from "../../contexts/UserContext";

import QuestAdmin from "../../components/QuestAdmin";
import QuestList from "../../components/QuestList";
import UserRatings from "../../components/UserRatings";
import Celebration from "../../components/Celebration";
import SingleQuest from "../../components/SingleQuest";

const MyProfile = () => {
  const { loggedIn, userQuests, userAvatar, levelUpAnimation, actions: {setLevelUpAnimation} } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [openQuest, setOpenQuest] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState();
  const navigate = useNavigate();

  // Set theme for ThemeProvider. This will be used to set color for Circular Progress
  const theme = createTheme({
    palette: {
      primary: {
        main: '#60D394',
      }
    },
  });

  // When level up is triggered, open Celebration dialog to display level up notification.
  useEffect(() => {
    if(levelUpAnimation === true){
      setOpen(true);
    }
  }, [levelUpAnimation])

  if (loggedIn && userAvatar) {
    return (
        <Wrapper>
          <Body>
            <UserDetails>
              <Title>{loggedIn.handler}</Title>
              {userAvatar && (
                <AvatarWrapper>
                  <Pokemon cldImg={userAvatar} />
                  {loggedIn.taskPoints &&
                  <ThemeProvider theme={theme}>
                    <Tippy content={<TaskPoints>{loggedIn.taskPoints} task points</TaskPoints>}>
                      {/* Points are accumulated from completed quests. The remainder when divided by 100 determines the progress to the next level */}
                    <LevelProgress variant="determinate" value={loggedIn.taskPoints % 100} size="180px" color="primary" />
                    </Tippy>
                  </ThemeProvider>
                  }
                </AvatarWrapper>
              )}
              <p>{userAvatar.publicID
                    .split("/")[2]
                    .split("_")[0]
                    .toUpperCase()}{" "}</p>
              <p>LEVEL {loggedIn.level} : KARMA {loggedIn.karma}</p>
                {/* ratings are used to store updated ratings value. Since user should not be able to rate themselves. Setting this to null as placeholder */}
                <UserRatings ratings={null} currentRatings={loggedIn.ratings}/>
              </UserDetails>
            <Panels>
            {userQuests && 
            <>
              <Panel>
                {/* Display all quests user has created. User has option to delete or complete quests from here */}
              <SubTitle>My Quests</SubTitle>
              {userQuests.questsOwned.length === 0
              ?<MissingQuest>
                <Button onClick={() => navigate("/")}>CLICK TO CREATE A QUEST!</Button>
              </MissingQuest>
              :<MyQuests>
                <Scroll>
                  <QuestAdmin quests={userQuests.questsOwned} />
                  </Scroll>
                </MyQuests>
              }
              </Panel>
              <Panel>
                {/* Display all quests user is currently on. TO DO: User should be able to leave quest from here */}
              <SubTitle>Quests I'm on</SubTitle>
              {userQuests.questsOn.length === 0
              ?<MissingQuest>
                <Button onClick={() => navigate("/")}>CLICK TO JOIN A QUEST!</Button>
              </MissingQuest>
              :<MyQuests>
                <Scroll>
                <QuestList quests={userQuests.questsOn} setSelectedQuest={setSelectedQuest} setOpenQuest={setOpenQuest}/>
                </Scroll>
              </MyQuests>
              }
              </Panel>
            </>
            }
            </Panels>
            {/* Pop up to display details of quest user is on */}
            <Dialog open={openQuest} onClose={() => setOpenQuest(false)} maxWidth="xl">
              <SingleQuest selectedQuest={selectedQuest} showDirections={null} showMapsIcon={false}/>
            </Dialog>
            {/* Pop up to notify user when level up has occurred */}
            <Celebration open={open} setOpen={setOpen} userAvatar={userAvatar} setLevelUpAnimation={setLevelUpAnimation}/>
          </Body>
        </Wrapper>
    );
  }
};

// FONTS
const Title = styled.h2`
  font-size: 1.4em;
  font-weight: 500;
  color: var(--color-dark-grey);
  padding: 15px;
`;
const SubTitle = styled.p`
  text-align: center;
  font-size: 24px;
  color: var(--color-dark-grey);
`;
const TaskPoints = styled.span`
  font-family: var(--font);
  color: var(--color-dark-grey);
  background-color: var(--color-grey);
  border-radius: 5px;
  padding: 3px;
`;

// DIVS
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font);
  background: linear-gradient(120deg, white, var(--color-blue));
`;
const Body = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 100%;
`;
const UserDetails = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 0;
  min-width: 20%;
  justify-content: space-evenly;
  border-radius: 15px;
  box-shadow: 0px 0px 10px var(--color-blue);
  background-color: var(--color-grey);
  color: var(--color-dark-grey);
  font-size: 1.2em;

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
  box-shadow: 0px 0px 10px var(--color-blue);
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
  max-height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  margin-top: 20px;
  max-height: 100%;
  box-shadow: 0px 0px 8px var(--color-blue);
  background-color: var(--color-grey);
`;
const Scroll = styled.div`
  padding: 10px;
  margin: 10px;
  overflow: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 10px var(--color-grey); 
}
 
::-webkit-scrollbar-thumb {
  background: var(--color-blue); 
}
`
const MissingQuest = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 0px 0px 8px var(--color-blue);
  background-color: var(--color-grey);
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
