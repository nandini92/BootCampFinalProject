import { GoogleMap, Marker } from "@react-google-maps/api";
import { useMemo } from "react";
import styled from "styled-components";

const QuestMap = () => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = useMemo(() => ({ lat: 45.5019, lng: -73.5674}), []);

  const zoom = 11;

  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerStyle={containerStyle}
    >
        <Marker position={{ lat: 45.5019, lng: -73.5674}} />
    </GoogleMap>
  );
};

export default QuestMap;
