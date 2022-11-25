import { createContext, useEffect, useState } from "react";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState();

  // TODO: How to pull data set based on location. Not scalable if user zooms out.
  // ALT: restrict zoom out on map.
  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
      });
  }, []);

  // Get otherUser details
  const getOtherUser = (id) => {
      return fetch(`/user/${id}`)
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



  return (
    <UsersContext.Provider value={{users, actions:{getOtherUser}}}>
        {children}
    </UsersContext.Provider>
  );
};
