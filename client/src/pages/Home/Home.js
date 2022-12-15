import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJsApiLoader  } from "@react-google-maps/api";
import styled from "styled-components";
import { FiPlus, FiArrowLeft } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import Tippy from '@tippyjs/react';

import { UserContext } from "../../contexts/UserContext";
import { QuestsContext } from "../../contexts/QuestsContext";
import { AuthContext } from "../../contexts/AuthContext";

import Welcome from "./Welcome";
import QuestMap from "./QuestMap";
import QuestList from "../../components/QuestList";
import NewQuest from "./NewQuest";
import SingleQuest from "../../components/SingleQuest";
import Confirmation from "./Confirmation";
import Celebration from "../../components/Celebration";


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
  const [directions, setDirections] = useState("");
  const [userPosition, setUserPosition] = useState({lat:45.5019, lng: -73.5674});

  const navigate = useNavigate();

  // Create google enabled search box for address selection
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: cred.googleMaps,
    libraries,
  });

  // newUser is set in UserContext upon first log in. Effect will redirect to AvatarSetup page for user to select their avatar.
  useEffect(() => {
    if (newUser === true) {
      navigate("/avatar");
    }
  }, [newUser]);

  // When level up is triggered, open Celebration dialog to display level up notification.
  useEffect(() => {
    if(levelUpAnimation === true){
      setOpen(true);
    }
  }, [levelUpAnimation])

  // handleNavigation : func to set module component on home page depending on nav buttons clicked. User can either view QuestList, NewQuest or SingleQuest based on these state combinations.
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

  // Use DirectionsService to get walking directions
  const showDirections = async (coords) => {
    if ( directions !== ""){
      setDirections("");
    } else if (coords !== undefined && userPosition !== undefined) {
      const directionsService = new window.google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: userPosition,
        destination: coords,
        travelMode: window.google.maps.TravelMode.WALKING,
      });
      setDirections(results);
    }
  };

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
              {/* Display brief user welcome text only above the Quest List module. */}
              {loggedIn &&
                newQuest === false &&
                !selectedQuest &&
                confirmation === false && (
                  <p>Hello {loggedIn.handler}. Choose a quest to begin!</p>
                )}
              <Pages>
                {/* Display verbose user welcome text to unsigned In user in module */}
                {!loggedIn && <Welcome loggedIn={loggedIn} />}
                {/* Display new quest creation form in module*/}
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
                {/* Display single quest in module based on quest selected in Quest List component*/}
                {selectedQuest && confirmation === false && (
                  <SingleQuest selectedQuest={selectedQuest} showDirections={showDirections} showMapsIcon={true}/>
                )}
                {/* Display all quests in module */}
                {loggedIn &&
                  newQuest === false &&
                  !selectedQuest &&
                  confirmation === false && (
                    <>
                      {quests?.length > 0 ? (
                        <QuestList
                          quests={quests}
                          setSelectedQuest={setSelectedQuest}
                          setOpenQuest={null}
                        />
                      ) : (
                        <Welcome loggedIn={loggedIn} />
                      )}
                    </>
                  )}
                {/* Display confirmation in module only after new quest is created */}
                {confirmation === true && <Confirmation />}
              </Pages>
            </div>
          </Wrapper>
          {/* Google Maps display in background */}
          <QuestMap
            loggedIn={loggedIn}
            quests={quests}
            selectedQuest={selectedQuest}
            setSelectedQuest={setSelectedQuest}
            setNewQuest={setNewQuest}
            setNewMarker={setNewMarker}
            newMarker={newMarker}
            setConfirmation={setConfirmation}
            directions={directions}
            setDirections={setDirections}
            userPosition={userPosition}
            setUserPosition={setUserPosition}
          />
          {/* Pop up to notify user when level up has occurred */}
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

  p {
    margin: 5px;
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

export default Home;
