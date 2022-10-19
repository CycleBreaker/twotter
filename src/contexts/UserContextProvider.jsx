import { createContext } from "react";
import userStorage from "../containers/userStorage";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const {
    currentUser,
    currentUserInfo,
    launchLoginProcess,
    logout,
    updateNameOrBio,
    getFollowingList,
  } = userStorage();
  return (
    <UserContext.Provider
      value={{
        currentUser,
        currentUserInfo,
        launchLoginProcess,
        logout,
        updateNameOrBio,
        getFollowingList,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
