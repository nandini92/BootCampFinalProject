import { useContext, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

import { UserContext } from "../contexts/UserContext";
import { QuestsContext } from "../contexts/QuestsContext";
import QuestMap from "./QuestMap";
import QuestList from "./QuestList";
import QuestAdmin from "./QuestAdmin";

import styled from "styled-components";

const Home = () => {
  const { cred } = useContext(UserContext);
  const { quests } = useContext(QuestsContext);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: cred.googleMaps,
  });

  const [formData, setFormData] = useState();

  const formSubmit = (e) => {
    e.preventDefault();

    fetch(`/new-quest/092cd559-2108-4328-aefe-3607d0759727`, {
        method: "POST",
        headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then((data) => {
        if(data.status === 500){
            throw new Error(data.message);
        }
    })
    .catch(error => window.alert(error));
  }

  return (
    <>
      {!isLoaded ? (
        <p>Loading</p>
      ) : (
        <Map>
          {quests && (
            <>
              {/* <QuestList quests={quests}/> */}
              <QuestAdmin formData={formData} setFormData={setFormData} formSubmit={formSubmit}/>
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
