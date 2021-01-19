import React from "react";

export const User = React.createContext({
  user: {},
  setUser: (user) => {},
});
User.displayName = "User";
