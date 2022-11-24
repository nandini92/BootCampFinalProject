import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QuestsProvider } from "./contexts/QuestsContext";
import { UserProvider } from "./contexts/UserContext";
import { UsersProvider } from "./contexts/UsersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UsersProvider>
      <QuestsProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </QuestsProvider>
    </UsersProvider>
  </React.StrictMode>
);
