import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Cloudinary } from "@cloudinary/url-gen";

import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { cred } = useContext(AuthContext);
  const [newUser, setNewUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState();
  const [userQuests, setUserQuests] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [userUpdate, setUserUpdate] = useState(1);
  const [levelUp, setLevelUp] = useState(false);
  const [levelUpAnimation, setLevelUpAnimation] = useState(false);

  // Authenticate user 
  const { user, isAuthenticated } = useAuth0();

  // Create a Cloudinary instance for avatar setup. 
  const cld = new Cloudinary({
    cloud: {
      cloudName: cred.cloudName,
    },
  });

  //Get logged in user details. This will retrigger every time there is a quest creation/deletion, user has been added to a quest, level up has occurred.
  useEffect(() => {
    if (isAuthenticated === true) { 
      fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      })
      .then((res) => res.json())
      .then((data) => {
          if (data.status === 200) {
            setLoggedIn(data.data);
            setNewUser(false);
            setLevelUp(false);
          } else if (data.status === 404) {
            setNewUser(true);
          } else {
            throw new Error(data.message);
          }
        })
      .catch((error) => console.log(error));
    }
  }, [isAuthenticated, newUser, userUpdate, levelUp])

  // Use Effect to set quest, level and avatar attributes
  useEffect(() => {
    if (loggedIn) {
      // Get all cloudinary public Ids for avatars
      setUserAvatar(cld.image(loggedIn.avatar));

      // Get all users active quests
      fetch(`${process.env.REACT_APP_SERVER_URL}/quests/${loggedIn._id}`)
      .then(res => res.json())
      .then((data) => {
        if(data.status === 201){
          setUserQuests(data.data);
        }
        else {
          throw new Error(data.message);
        }})
      .catch((error) => console.log(error));
    
    // Trigger level up
    if(Math.floor((loggedIn.taskPoints / 100)) >= loggedIn.level ){
      fetch(`${process.env.REACT_APP_SERVER_URL}/user-level/${loggedIn._id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({level: loggedIn.level + 1}),
      })
        .then((data) => {
          if (data.status === 200) {
            setLevelUp(true);
            setLevelUpAnimation(true);
          } else {
            throw new Error(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } 
    } 
  }, [loggedIn, userUpdate]);

  // Create new User
  const createUser = (user) => {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/new-user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((data) => {
        if (data.status === 200) {
          setNewUser(false);
          console.log(data.status);
          return true;
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  return (
    <UserContext.Provider value={{ newUser, loggedIn, userQuests, userAvatar, cld, userUpdate, levelUpAnimation, actions: { createUser, setNewUser, setUserUpdate, setLoggedIn, setLevelUpAnimation } }}>
      {children}
    </UserContext.Provider>
  );
};
