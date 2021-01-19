import React from "react";

export const User = React.createContext({
  user: {},
  setUser: (user) => {},
});
User.displayName = "User";

export function getUserID(user) {
  if (!user.id) {
    return "";
  }
  return atob(user.id).split(":")[1];
}
