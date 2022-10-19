import { useContext } from "react";
//React Router
import { Routes, Route } from "react-router-dom";
//Contexts
import { ThemeContext } from "../contexts/ThemeContextProvider";
//App components
import Header from "./Header";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import SettingsModal from "./SettingsModal";
import withProfileData from "../containers/withProfileData";
import withSettingsData from "../containers/withSettingsData";

//Wrappers and Higher-Order Components
const SettingsWithData = withSettingsData(SettingsModal);
const SettingsModalWrapper = function () {
  const { settingsPopupOn } = useContext(ThemeContext);
  return settingsPopupOn ? <SettingsWithData /> : null;
};
const ProfileWithData = withProfileData(Profile);

export default function Content() {
  return (
    <>
      <Header />
      <div className="bg-backgroundLight dark:bg-backgroundDark text-textLight dark:text-textDark w-full min-h-screen h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/:userId`} element={<ProfileWithData />} />
        </Routes>
      </div>
      <SettingsModalWrapper />
    </>
  );
}
