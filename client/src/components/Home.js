import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import { useAuth0 } from "@auth0/auth0-react";
import { FiPlus, FiArrowLeft } from "react-icons/fi";

import { UserContext } from "../contexts/UserContext";
import { QuestsContext } from "../contexts/QuestsContext";
import QuestMap from "./QuestMap";
import QuestList from "./QuestList";
import QuestAdmin from "./QuestAdmin";
import SingleQuest from "./SingleQuest";

import styled from "styled-components";

const Home = () => {
  const { cred, actions: { getUser } } = useContext(UserContext);
  const { quests } = useContext(QuestsContext);
  const [selectedQuest, setSelectedQuest] = useState();
  const [newQuest, setNewQuest] = useState(false);
  const [questList, setQuestList] = useState();
  const [newMarker, setNewMarker] = useState();
  const navigate = useNavigate();

  // Authenticate user 
  const { user, isAuthenticated } = useAuth0();

  // Create google enabled search box for address selection 
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: cred.googleMaps,
    libraries: ['places']
  });

  // useEffect to set Quest List
  useEffect(()=> {
    setQuestList(quests);
  }, [quests])

  // Get and set User details
  useEffect(() => {
    if (isAuthenticated) {
      getUser(user.email).then((res) => !res && navigate("/avatar"));
    }
  }, [isAuthenticated]);

  return (
    <>
      {!isLoaded ? (
        <p>Loading</p>
      ) : (
        <Map>
            <Wrapper>
              <Options>
              {
                selectedQuest && <Back onClick={() => {setNewQuest(false); setSelectedQuest()}}/>
              }
              { 
              newQuest === true
                ?<Back onClick={() => {setNewQuest(false); setSelectedQuest(); setNewMarker()}}/>
                :<Add onClick={() => {setNewQuest(true); setSelectedQuest()}}/>
              }
              </Options>
              <Pages>
              {newQuest === true  && !selectedQuest && user
              && <QuestAdmin setQuestList={setQuestList} questList={questList}  newMarker={newMarker}/>}
              {selectedQuest  && <SingleQuest selectedQuest={selectedQuest} />}
              {newQuest === false && !selectedQuest && <QuestList questList={questList} setSelectedQuest={setSelectedQuest} />}
              </Pages>
            </Wrapper>
            <QuestMap
            questList={questList}
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--color-dark-grey);
`
const Add = styled(FiPlus)`
  border-radius: 5px;
  padding: 5px;
  margin:20px;
  background-color: var(--color-yellow);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`
const Back = styled(FiArrowLeft)`
  border-radius: 5px;
  padding: 5px;
  margin:20px;
  background-color: var(--color-red);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`
const Wrapper = styled.div`
  position: absolute;
  z-index: 5;
  min-width: 30%;
  height: 100%;
  background-color: var(--color-grey);
  box-shadow: 0px 0px 10px var(--color-purple);
`;
const Pages = styled.div`
  max-height: 92%;
  overflow: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
`
export default Home;
