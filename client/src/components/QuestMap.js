import { GoogleMap, MarkerF } from "@react-google-maps/api";
import {  useMemo } from "react";

const QuestMap = ({questList, setSelectedQuest, setNewQuest}) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = useMemo(() => ({ lat: 45.5019, lng: -73.5674}), []);
  const zoom = 12;

  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerStyle={containerStyle}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false
      }}
    >
      {questList &&
        questList.map((quest) => <MarkerF key={quest._id} position={quest.location} onClick={() =>{ setNewQuest(false); setSelectedQuest(quest._id) }} />)
      }
    </GoogleMap>
  );
};

export default QuestMap;
