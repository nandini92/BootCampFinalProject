import { useContext } from "react";
import { useLoadScript } from "@react-google-maps/api";

import { UserContext } from "../contexts/UserContext";
import { QuestsContext } from "../contexts/QuestsContext";
import QuestMap from "./QuestMap";
import QuestList from "./QuestList";

import styled from "styled-components";

const Home = () => {
  const { cred } = useContext(UserContext);
  const { quests } = useContext(QuestsContext);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: cred.googleMaps,
  });

  return (
    <>
      {!isLoaded ? (
        <p>Loading</p>
      ) : (
        <Map>
          {quests && (
            <>
              <QuestList quests={quests}/>
              <QuestMap quests={quests} />
            </>
          )}
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

export default Home;
