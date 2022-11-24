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

  return (
    <UsersContext.Provider value={{users}}>
        {children}
    </UsersContext.Provider>
  );
};
