import { GoogleMap, MarkerF } from "@react-google-maps/api";
import {  useMemo, useState } from "react";
import MapsStyles from "../assets/MapStyles"

const QuestMap = ({questList, setSelectedQuest, setNewQuest, setNewMarker, newMarker}) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {lat: 45.5019, lng: -73.5674};
  const zoom = 12;
  const options = {
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    styles: MapsStyles 
  }

  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerStyle={containerStyle}
      options={options}
      onClick={(e) => {
        setNewMarker({lat:e.latLng.lat(), lng:e.latLng.lng()});
        setSelectedQuest();
        setNewQuest(true);
      }}
    >
      {questList &&
        questList.map((quest) => <MarkerF key={quest._id} position={quest.location} onClick={() =>{ setNewQuest(false); setSelectedQuest(quest._id) }} />)
      }
      {
        newMarker &&
        <MarkerF key="newMarker" position={newMarker}/>
      }
    </GoogleMap>
  );
};

export default QuestMap;
