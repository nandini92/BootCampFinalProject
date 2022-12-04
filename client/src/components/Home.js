import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJsApiLoader  } from "@react-google-maps/api";
import { FiPlus, FiArrowLeft } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import Tippy from '@tippyjs/react';

import { UserContext } from "../contexts/UserContext";
import { QuestsContext } from "../contexts/QuestsContext";
import { AuthContext } from "../contexts/AuthContext";

import Welcome from "./Welcome";
import QuestMap from "./QuestMap";
import QuestList from "./QuestList";
import NewQuest from "./NewQuest";
import SingleQuest from "./SingleQuest";
import Confirmation from "./Confirmation";
import Celebration from "../assets/Celebration";

import styled from "styled-components";

const Home = () => {
  const { cred } = useContext(AuthContext);
  const {
    newUser,
    loggedIn,
    levelUpAnimation,
    userAvatar,
    actions: { setUserUpdate, setLevelUpAnimation },
  } = useContext(UserContext);
  const {
    quests,
    actions: { setQuests },
  } = useContext(QuestsContext);

  const [selectedQuest, setSelectedQuest] = useState();
  const [newQuest, setNewQuest] = useState(false);
  const [newMarker, setNewMarker] = useState();
  const [confirmation, setConfirmation] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // Create google enabled search box for address selection
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: cred.googleMaps,
    libraries,
  });

  // Redirect to Avatar setup page in case new user
  useEffect(() => {
    if (newUser === true) {
      navigate("/avatar");
    }
  }, [newUser]);

  // Display level up animation 
  useEffect(() => {
    if(levelUpAnimation === true){
      setOpen(true);
    }
  }, [levelUpAnimation])

  const handleNavigation = (nav) => {
    if(nav === "add"){
      setNewQuest(true);
      setSelectedQuest();
    } else if (nav === "back"){
      setNewQuest(false);
      setSelectedQuest();
    } else if (nav === "clear"){
      setNewQuest(false);
      setSelectedQuest();
      setNewMarker();
      setConfirmation(false);
    }
  }

  return (
    <>
      {!isLoaded ? (
        <Loading color="#3d7dca" />
      ) : (
        <Map>
          <Options>
            {selectedQuest && (
              <Tippy content={<Instructions>Back to Quest List</Instructions>}>
                <Button onClick={() => handleNavigation("back")} >
                  <Back />
                </Button>
              </Tippy>
            )}
            {newQuest === true ? (
              <Tippy content={<Instructions>Back to Quest List</Instructions>}>
                <Button onClick={() => handleNavigation("clear")}>
                  <Back />
                </Button>
              </Tippy>
            ) : (
              <>
                {loggedIn && (
                  <Tippy content={<Instructions>Create New Quest</Instructions>}>
                    <Button onClick={() => handleNavigation("add")}>
                      <Add />
                    </Button>
                  </Tippy>
                )}
              </>
            )}
          </Options>
          <Wrapper>
            <div>
              {loggedIn &&
                newQuest === false &&
                !selectedQuest &&
                confirmation === false && (
                  <p>Hello {loggedIn.handler}. Choose a quest to begin!</p>
                )}
              <Pages>
                {!loggedIn && <Welcome loggedIn={loggedIn} />}
                {newQuest === true &&
                  !selectedQuest &&
                  loggedIn &&
                  confirmation === false && (
                    <NewQuest
                      cred={cred}
                      loggedIn={loggedIn}
                      setQuests={setQuests}
                      quests={quests}
                      newMarker={newMarker}
                      setUserUpdate={setUserUpdate}
                      setConfirmation={setConfirmation}
                    />
                  )}
                {selectedQuest && confirmation === false && (
                  <SingleQuest selectedQuest={selectedQuest} />
                )}
                {loggedIn &&
                  newQuest === false &&
                  !selectedQuest &&
                  confirmation === false && (
                    <>
                      {quests.length > 0 ? (
                        <QuestList
                          quests={quests}
                          setSelectedQuest={setSelectedQuest}
                        />
                      ) : (
                        <Welcome loggedIn={loggedIn} />
                      )}
                    </>
                  )}
                {confirmation === true && <Confirmation />}
              </Pages>
            </div>
          </Wrapper>
          <QuestMap
            loggedIn={loggedIn}
            quests={quests}
            selectedQuest={selectedQuest}
            setSelectedQuest={setSelectedQuest}
            setNewQuest={setNewQuest}
            setNewMarker={setNewMarker}
            newMarker={newMarker}
            setConfirmation={setConfirmation}
          />
          <Celebration
            open={open}
            setOpen={setOpen}
            userAvatar={userAvatar}
            setLevelUpAnimation={setLevelUpAnimation}
          />
        </Map>
      )}
    </>
  );
};


const Loading = styled(BeatLoader)`
  align-self: center;
`;
const Map = styled.div`
  position: absolute;
  top: 100px;
  height: 89vh;
  width: 100vw;
`;
const Options = styled.div`
  position: absolute;
  top: 25px;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Button = styled.div`
  margin: 20px;
`;
const Instructions = styled.span`
  font-family: var(--font);
  font-size: smaller;
  color: var(--color-dark-grey);
  background-color: var(--color-grey);
  border-radius: 5px;
  padding: 1px;
`;
const Add = styled(FiPlus)`
  border-radius: 5px;
  border: 2px solid var(--color-dark-grey);
  padding: 5px;
  background-color: var(--color-yellow);
  box-shadow: 0px 0px 5px var(--color-dark-grey);
  transition: transform 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;
const Back = styled(FiArrowLeft)`
  border-radius: 5px;
  border: 2px solid var(--color-dark-grey);
  padding: 5px;
  background-color: var(--color-red);
  box-shadow: 0px 0px 5px var(--color-dark-grey);
  transition: transform 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;
const Wrapper = styled.div`
  position: absolute;
  z-index: 5;
  top: 95px;
  left: 20px;
  width: 550px;
  max-height: 90%;
  padding: 20px 40px;
  border-radius: 15px;
  background-color: var(--color-grey);
  box-shadow: 0px 0px 10px var(--color-purple);

  animation: slideOut ease-in 0.3s;
  @keyframes slideOut {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
const Pages = styled.div`
  position: relative;
  overflow: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
  max-height: 65vh;
  padding: 10px;

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 10px var(--color-grey); 
}
 
::-webkit-scrollbar-thumb {
  background: var(--color-blue); 
}
`;
export default Home;
