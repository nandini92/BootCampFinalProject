import { useContext } from "react";
import { useLoadScript } from "@react-google-maps/api";
import QuestMap from "./QuestMap";
import styled from "styled-components";

import { UserContext } from "../contexts/UserContext";

const Home = () => {
  const { cred } = useContext( UserContext ) ;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: cred.googleMaps,
  });

  return (
    <>
      {!isLoaded ? (
        <p>Loading</p>
      ) : (
        <Map>
          <QuestMap cred/>
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
