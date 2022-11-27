import { GoogleMap, MarkerF } from "@react-google-maps/api";
import {  useMemo, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import MapsStyles from "../assets/MapStyles"

const QuestMap = ({questList, setSelectedQuest, setNewQuest, setNewMarker, newMarker}) => {
  const { user } = useContext(UserContext);
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  // NOTE: To ensure that map does not recenter each time map clicked
  const center = useMemo(() => ({ lat: 45.5019, lng: -73.5674}), []);
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
        questList.map((quest) => 
        <MarkerF key={quest._id} 
          position={quest.location} 
          onClick={() =>{ setNewQuest(false); setSelectedQuest(quest._id) }}
          // icon={{
          //   url: `/assets/${quest.type}.png`,
          //   origin: new window.google.maps.Point(0,0),
          //   anchor: new window.google.maps.Point(15,15)
          // }}
         />)
      }
      {
        newMarker &&
        <MarkerF key="newMarker" position={newMarker} 
          icon={{
            url: `/assets/${user.avatarType}.png`,
            origin: new window.google.maps.Point(0,0),
            anchor: new window.google.maps.Point(15,15)
          }}
        />
      }
    </GoogleMap>
  );
};

export default QuestMap;
