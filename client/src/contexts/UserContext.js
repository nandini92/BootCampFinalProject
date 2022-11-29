import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Cloudinary } from "@cloudinary/url-gen";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [newUser, setNewUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState();
  const [userQuests, setUserQuests] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [userUpdate, setUserUpdate] = useState();

  // Authenticate user 
  const { user, isAuthenticated } = useAuth0();

  // Create a Cloudinary instance for avatar setup
  const cld = new Cloudinary({
    // TO DO: Replace with cred
    cloud: {
      cloudName: "daeu4xdvz",
    },
  });

  useEffect(() => {
    if (isAuthenticated) { 
      fetch("/user", {
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
          } else if (data.status === 404) {
            setNewUser(true);
          } else {
            throw new Error(data.message);
          }
        })
      .catch((error) => console.log(error));
    }
  }, [isAuthenticated, newUser, userUpdate])

  // Use Effect to set quest and avatar attributes
  useEffect(() => {
    if (loggedIn) {
      // Get all cloudinary public Ids for avatars
      setUserAvatar(cld.image(loggedIn.avatar));

      // Get all users active quests
      fetch(`/quests/${loggedIn._id}`)
      .then(res => res.json())
      .then((data) => {
        if(data.status === 201){
          setUserQuests(data.data);
        }
        else {
          throw new Error(data.message);
        }})
      .catch((error) => console.log(error));
    } 
  }, [loggedIn, userUpdate]);

  // Create new User
  const createUser = (user) => {
    return fetch("/new-user", {
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
    <UserContext.Provider value={{ newUser, loggedIn, userQuests, userAvatar, cld, userUpdate, actions: { createUser, setNewUser, setUserUpdate } }}>
      {children}
    </UserContext.Provider>
  );
};
