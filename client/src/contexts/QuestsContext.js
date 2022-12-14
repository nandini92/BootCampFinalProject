import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { AuthContext } from "./AuthContext";

export const QuestsContext = createContext();

export const QuestsProvider = ({ children }) => {
  const { URL } = useContext(AuthContext);
  const {actions:{setUserUpdate}} = useContext(UserContext);
  const [quests, setQuests] = useState();
  const [questUpdate, setQuestUpdate] = useState(1);

  // Get all quests in database
  useEffect(() => {
    fetch(`${URL}/quests`)
      .then((res) => res.json())
      .then((data) => {
        setQuests(data.data);
      });
  }, [questUpdate]);

  // Add user to quest 
  const updateQuestParticipants = (selectedQuest, user, action) => {
    return fetch(`${URL}/quest/${selectedQuest}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ participant: user, action: action}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          setQuestUpdate(questUpdate => questUpdate + 1);
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
    fetch(`${URL}/quest/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setQuestUpdate(questUpdate => questUpdate + 1);
          setUserUpdate(userUpdate => userUpdate + 1);
        } else {
          throw new Error(data.message);
        }
      })
    .catch((error) => window.alert(error));
  }

    // Function to mark quest  as complete. Completed quests will not appear anywhere but are stored in database for tracking.
    const completeQuest = (id) => {
      fetch(`${URL}/completed-quest/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setQuestUpdate(questUpdate => questUpdate + 1);
            setUserUpdate(userUpdate => userUpdate + 1);
          } else {
            throw new Error(data.message);
          }
        })
      .catch((error) => window.alert(error));
    }

  return (
    <QuestsContext.Provider value={{quests, questUpdate, actions:{setQuests, updateQuestParticipants, completeQuest, deleteQuest}}}>
        {children}
    </QuestsContext.Provider>
  );
};
