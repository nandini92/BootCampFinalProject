import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QuestsProvider } from "./contexts/QuestsContext";
import { UserProvider } from "./contexts/UserContext";
import { UsersProvider } from "./contexts/UsersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <UsersProvider>
        <QuestsProvider>
          <App />
        </QuestsProvider>
      </UsersProvider>
    </UserProvider>
  </React.StrictMode>
);
