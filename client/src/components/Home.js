import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import { FiPlus, FiArrowLeft } from "react-icons/fi";

import { UserContext } from "../contexts/UserContext";
import { QuestsContext } from "../contexts/QuestsContext";
import { AuthContext } from "../contexts/AuthContext";

import Welcome from "./Welcome";
import QuestMap from "./QuestMap";
import QuestList from "./QuestList";
import NewQuest from "./NewQuest";
import SingleQuest from "./SingleQuest";
import Confirmation from "./Confirmation";

import styled from "styled-components";

const Home = () => {
  const { cred } = useContext(AuthContext);
  const {
    newUser,
    loggedIn,
    userUpdate,
    actions: { setUserUpdate },
  } = useContext(UserContext);
  const {
    quests,
    actions: { setQuests },
  } = useContext(QuestsContext);

  const [selectedQuest, setSelectedQuest] = useState();
  const [newQuest, setNewQuest] = useState(false);
  const [newMarker, setNewMarker] = useState();
  const [confirmation, showConfirmation] = useState(false);

  const navigate = useNavigate();

  // Create google enabled search box for address selection
  const [libraries] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: cred.googleMaps,
    libraries,
  });

  // Redirect to Avatar setup page in case new user
  useEffect(() => {
    if (newUser === true) {
      navigate("/avatar");
    }
  }, [newUser]);

  // Show confirmation page when new quest is created
  useEffect(() => {
    userUpdate &&
    showConfirmation(true);
  }, [userUpdate])

  return (
    <>
      {!isLoaded ? (
        <p>Loading</p>
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
                  showConfirmation(false);
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
              {!loggedIn && <Welcome />}
              {newQuest === true && !selectedQuest && loggedIn  && confirmation === false && (
                <NewQuest
                  cred={cred}
                  loggedIn={loggedIn}
                  setQuests={setQuests}
                  quests={quests}
                  newMarker={newMarker}
                  setUserUpdate={setUserUpdate}
                />
              )}
              {selectedQuest  && confirmation === false && <SingleQuest selectedQuest={selectedQuest} />}
              {newQuest === false && !selectedQuest && confirmation === false && (
                <QuestList
                  quests={quests}
                  setSelectedQuest={setSelectedQuest}
                />
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
            setSelectedQuest={setSelectedQuest}
            setNewQuest={setNewQuest}
            setNewMarker={setNewMarker}
            newMarker={newMarker}
          />
        </Map>
      )}
    </>
  );
};

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
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;
const Back = styled(FiArrowLeft)`
  border-radius: 5px;
  border: 2px solid var(--color-dark-grey);
  padding: 5px;
  margin: 20px;
  background-color: var(--color-red);
  transition: transform 0.3s ease-in-out;

  &:hover {
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
`;
const Pages = styled.div`
  position: relative;
  max-height: 65vh;
  overflow: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;
export default Home;
