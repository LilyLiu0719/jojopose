import React from "react";

export const User = React.createContext({
  user: null,
  setUser: (user) => {},
});
User.displayName = "User";
