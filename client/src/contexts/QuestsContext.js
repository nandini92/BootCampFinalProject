import { createContext, useEffect, useState } from "react";

export const QuestsContext = createContext();

export const QuestsProvider = ({ children }) => {
  const [quests, setQuests] = useState();
  const [questUpdate, setQuestUpdate] = useState();

  // TODO: How to pull data set based on location. Not scalable if user zooms out.
  // ALT: restrict zoom out on map.
  useEffect(() => {
    fetch("/quests")
      .then((res) => res.json())
      .then((data) => {
        setQuests(data.data);
      });
  }, [questUpdate]);

  // Add user to quest 
  const addQuestParticipants = (selectedQuest, user, participants) => {
    return fetch(`/quest/${selectedQuest}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ participant: user, participants: participants}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          setQuestUpdate(selectedQuest);
          return true;
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  return (
    <QuestsContext.Provider value={{quests, actions:{setQuests, addQuestParticipants}}}>
        {children}
    </QuestsContext.Provider>
  );
};
