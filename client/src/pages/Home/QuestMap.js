import { GoogleMap, MarkerF, DirectionsRenderer } from "@react-google-maps/api";
import {  useMemo, useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import MapsStyles from "./MapStyles"

const QuestMap = ({quests, setSelectedQuest, setNewQuest, setNewMarker, newMarker, directions, setDirections, userPosition, setUserPosition}) => {
  const { loggedIn } = useContext(UserContext);

  // Google maps display settings
  const containerStyle = {
    width: "100%",
    height: "100%",
  };
  // useMemo: To ensure that map does not recenter each time map clicked
  const center = useMemo(() => userPosition, []);
  const zoom = 14;
  const options = {
    minZoom: 13,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    styles: MapsStyles,
  };

  // Get user's current location to provide walking directions to quest
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  // Clear states when map is randomly clicked and sets new quest coordinates to clicked location
  const clearMap = () => {
    setDirections("");
    setSelectedQuest();
    setNewQuest(true);
  };

  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerStyle={containerStyle}
      options={options}
      onClick={(e) => {
        if (loggedIn) {
          setNewMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
          clearMap();
        }
      }}
    >
      {quests &&
        quests
          .filter((item) => !item.completed)
          .map((quest) => (
            <MarkerF
              key={quest._id}
              position={quest.location}
              onClick={() => {
                if(loggedIn){
                setNewQuest(false);
                setSelectedQuest(quest._id);
                }
              }}
              icon={{
                url: `/assets/${quest.pinType}.png`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
            />
          ))}
      {newMarker && (
        <MarkerF
          key="newMarker"
          position={newMarker}
          icon={{
            url: `/assets/${loggedIn.avatarType}.png`,
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />
      )}
      {loggedIn && directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default QuestMap;
