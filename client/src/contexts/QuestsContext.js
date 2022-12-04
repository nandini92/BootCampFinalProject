import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const QuestsContext = createContext();

export const QuestsProvider = ({ children }) => {
  const {actions:{setUserUpdate}} = useContext(UserContext);
  const [quests, setQuests] = useState();
  const [questUpdate, setQuestUpdate] = useState();

  // Get all quests in database
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
          setUserUpdate(userUpdate => userUpdate + 1);
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

  
  // Function to delete quest. Deleted quests will be removed from database as well. Users are only allowed to delete quests if no other participant has joined the quest.
  const deleteQuest = (id) => {
    fetch(`/quest/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setQuestUpdate(id);
          setUserUpdate(userUpdate => userUpdate + 1);
        } else {
          throw new Error(data.message);
        }
      })
    .catch((error) => window.alert(error));
  }

    // Function to mark quest  as complete. Completed quests will not appear anywhere but are stored in database for tracking.
    const completeQuest = (id) => {
      fetch(`/completed-quest/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setQuestUpdate(id);
            setUserUpdate(userUpdate => userUpdate + 1);
          } else {
            throw new Error(data.message);
          }
        })
      .catch((error) => window.alert(error));
    }

  return (
    <QuestsContext.Provider value={{quests, questUpdate, actions:{setQuests, addQuestParticipants, completeQuest, deleteQuest}}}>
        {children}
    </QuestsContext.Provider>
  );
};
