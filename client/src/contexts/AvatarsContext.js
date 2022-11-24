import { createContext, useEffect, useState } from "react";

export const AvatarsContext = createContext();

export const AvatarsProvider = ({ children }) => {

  return (
    <AvatarsContext.Provider>
        {children}
    </AvatarsContext.Provider>
  );
};
