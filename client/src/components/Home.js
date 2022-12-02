import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJsApiLoader  } from "@react-google-maps/api";
import { FiPlus, FiArrowLeft } from "react-icons/fi";
import { BeatLoader } from "react-spinners";

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

  return (
    <>
      {!isLoaded ? (
        <Loading color="#3d7dca" />
      ) : (
        <Map>
          <Options>
            {selectedQuest && (
              <Back
                onClick={() => {
                  setNewQuest(false);
                  setSelectedQuest();
                }}
              />
            )}
            {newQuest === true ? (
              <Back
                onClick={() => {
                  setNewQuest(false);
                  setSelectedQuest();
                  setNewMarker();
                  setConfirmation(false);
                }}
              />
            ) : (
              <>
                {loggedIn && (
                  <Add
                    onClick={() => {
                      setNewQuest(true);
                      setSelectedQuest();
                    }}
                  />
                )}
              </>
            )}
          </Options>
          <Wrapper>
            <Pages>
              {!loggedIn && <Welcome loggedIn={loggedIn}/>}
              {newQuest === true && !selectedQuest && loggedIn  && confirmation === false && (
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
              {selectedQuest  && confirmation === false && <SingleQuest selectedQuest={selectedQuest} />}
              {loggedIn && newQuest === false && !selectedQuest && confirmation === false && (
                <>{ quests.length > 0
                  ?<>
                    <p>Hello {loggedIn.handler}. Choose a quest to begin!</p>
                    <QuestList
                    quests={quests}
                    setSelectedQuest={setSelectedQuest}
                    />
                  </>
                  : <Welcome loggedIn={loggedIn}/>
                }</>
              )}
              {
                confirmation === true && 
                <Confirmation />
              }
            </Pages>
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
          <Celebration open={open} setOpen={setOpen} userAvatar={userAvatar} setLevelUpAnimation={setLevelUpAnimation}/>
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
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Add = styled(FiPlus)`
  border-radius: 5px;
  border: 2px solid var(--color-dark-grey);
  padding: 5px;
  margin: 20px;
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
  margin: 20px;
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
  top: 70px;
  left: 20px;
  min-width: 30%;
  max-height: 90%;
  padding: 20px;
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
`;
export default Home;
