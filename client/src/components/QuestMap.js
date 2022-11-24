import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useContext, useMemo, useState } from "react";

import { QuestsContext } from "../contexts/QuestsContext";

const QuestMap = ({cred}) => {
  const { quests } = useContext(QuestsContext);
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
      {quests &&
        quests.map((quest) => <MarkerF key={quest._id} position={quest.coordinates} />)
      }
    </GoogleMap>
  );
};

export default QuestMap;
