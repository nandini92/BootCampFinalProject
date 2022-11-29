import { createContext, useEffect, useState } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { Cloudinary } from "@cloudinary/url-gen";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [cred, setCred] = useState();
  const [user, setUser] = useState();
  const [userQuests, setUserQuests] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [userUpdate, setUserUpdate] = useState();

  // Create a Cloudinary instance for avatar setup
  const cld = new Cloudinary({
    // TO DO: Replace with cred
    cloud: {
      cloudName: "daeu4xdvz",
    },
  });

  // Retrieves all API credentials from server
  useEffect(() => {
    fetch("/cred")
      .then((res) => res.json())
      .then((data) => {
        setCred(data);
      });
  }, []);

  // Set user details
  const getUser = (email) => {
    if (email === null) {
      setUser();
      return true;
    } else {
      return fetch("/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setUser(data.data);
            return true;
          } else if (data.status === 404) {
            return false;
          } else {
            throw new Error(data.message);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  // Use Effect to set quest and avatar attributes
  useEffect(() => {
    if (user) {
      // Get all cloudinary public Ids for avatars
      setUserAvatar(cld.image(user.avatar));

      // Get all users active quests
      fetch(`/quests/${user._id}`)
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
  }, [user]);

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
          getUser(user.email);
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
    <UserContext.Provider value={{ cred, user, userQuests, userAvatar, cld, actions: { createUser, getUser, setUserUpdate } }}>
      {cred && (
        <Auth0Provider
          domain={cred.domain}
          clientId={cred.clientId}
          redirectUri={window.location.origin}
        >
          {children}
        </Auth0Provider>
      )}
    </UserContext.Provider>
  );
};
