import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const { cld, newUser } = useContext(UserContext);
  const [users, setUsers] = useState();

  // Fetch all users from database
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
      });
  }, [newUser]);

  // Get otherUser details
  const getOtherUser = (id) => {
      return fetch(`${process.env.REACT_APP_SERVER_URL}/user/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            return data.data;
          } else {
            throw new Error(data.message);
          }
        })
        .catch((error) => console.log(error));
  }

  // Get all cloudinary public Ids for avatars
  const getUsersAvatar = (user) => {
      return cld.image(user.avatar);
  }

  // Get all users active quests
  const getUsersQuests = (id) => {
      return fetch(`${process.env.REACT_APP_SERVER_URL}/quests/${id}`)
      .then(res => res.json())
      .then((data) => {
        if(data.status === 201){
          return data.data;
        }
        else {
          throw new Error(data.message);
        }})
      .catch((error) => console.log(error));
  } 


  return (
    <UsersContext.Provider value={{users, actions:{getOtherUser, getUsersAvatar, getUsersQuests}}}>
        {children}
    </UsersContext.Provider>
  );
};
