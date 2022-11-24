import { createContext, useEffect, useState } from "react";

export const QuestsContext = createContext();

export const QuestsProvider = ({ children }) => {
  const [quests, setQuests] = useState();

  // TODO: How to pull data set based on location. Not scalable if user zooms out.
  // ALT: restrict zoom out on map.
  useEffect(() => {
    fetch("/quests")
      .then((res) => res.json())
      .then((data) => {
        setQuests(data.data);
      });
  }, []);

  return (
    <QuestsContext.Provider value={{quests}}>
        {children}
    </QuestsContext.Provider>
  );
};
