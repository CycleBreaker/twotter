import { createContext, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeContextProvider(props) {
  //Theme switching
  const [lightTheme, setLightTheme] = useState(
    localStorage.getItem("twotterLightTheme") === null
      ? true
      : Boolean(localStorage.getItem("twotterLightTheme"))
  );
  const switchTheme = function () {
    if (lightTheme) {
      setLightTheme(false);
      localStorage.setItem("twotterLightTheme", "");
    } else {
      setLightTheme(true);
      localStorage.setItem("twotterLightTheme", "true");
    }
  };
  //Settings popup switching
  const [settingsPopupOn, setSettingsPopupOn] = useState(false);
  const switchSettingsPopupOn = () => setSettingsPopupOn(!settingsPopupOn);

  return (
    <ThemeContext.Provider
      value={{
        lightTheme,
        switchTheme,
        settingsPopupOn,
        switchSettingsPopupOn,
      }}
    >
      <div className={lightTheme ? "" : "dark"}>
        <div className="bg-backgroundLight dark:bg-backgroundDark text-textLight dark:text-textDark">
          {props.children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
