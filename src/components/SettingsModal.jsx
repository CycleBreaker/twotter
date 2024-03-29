import { useContext, useEffect, useState } from "react";
//Contexts
import { UserContext } from "../contexts/UserContextProvider";
import { ThemeContext } from "../contexts/ThemeContextProvider";
//App components
import LoginButton from "./LoginButton";
import { textInputHook } from "../hooks";
//Icons
import { ImCheckmark } from "react-icons/im";

export default function SettingsModal(props) {
  const { updateUserInfo, selectImage } = props;
  const [avatarSelected, setAvatarSelected] = useState(false);
  const [coverSelected, setCoverSelected] = useState(false);
  //Contexts
  const { currentUser, currentUserInfo, logout } = useContext(UserContext);
  const { lightTheme, switchTheme, switchSettingsPopupOn } =
    useContext(ThemeContext);
  //Hooks
  const [inputName, inputTextName, resetName] = textInputHook(
    currentUserInfo ? currentUserInfo.name : ""
  );
  const [inputBio, inputTextBio, resetBio] = textInputHook(
    currentUserInfo ? currentUserInfo.bio : ""
  );

  const selectAvatar = (e) => {
    setAvatarSelected(true);
    selectImage(e.target.files[0], "avatar");
  };
  const selectCover = (e) => {
    setCoverSelected(true);
    selectImage(e.target.files[0], "cover");
  };

  const preventWindowClosing = (e) => e.stopPropagation();

  const saveAndClose = function () {
    updateUserInfo(inputName, inputBio);
    switchSettingsPopupOn();
  };

  useEffect(() => {
    inputTextName({
      target: { value: currentUserInfo.name ? currentUserInfo.name : "" },
    });
    inputTextBio({
      target: { value: currentUserInfo.bio ? currentUserInfo.bio : "" },
    });
  }, [currentUserInfo]);

  return (
    <>
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-[rgba(128,128,128,0.5)]"
        onClick={switchSettingsPopupOn}
      >
        <div
          onClick={preventWindowClosing}
          className="fixed top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%] bg-backgroundLight dark:bg-backgroundDark flex flex-col rounded-3xl shadow-[5px_5px_5px_1px_rgba(0,0,0,0.3),_-5px_-5px_5px_1px_rgba(255,255,255,0.5)] dark:shadow-[5px_5px_5px_1px_rgba(0,0,0,0.5),_-5px_-5px_5px_1px_rgba(255,255,255,0.2)] p-6"
        >
          <p className="text-2xl p-2 mx-auto">Settings</p>
          <div className="text-lg">
            {currentUser ? (
              <>
                <div className="flex pt-3 justify-between">
                  <p className="pr-3">Your name:</p>
                  <input
                    type="text"
                    className="textInputField"
                    value={inputName}
                    onChange={inputTextName}
                  />
                </div>
                <div className="flex pt-3 justify-between">
                  <p className="pr-3">Your bio:</p>
                  <textarea
                    type="text"
                    rows="3"
                    className="textInputField"
                    value={inputBio}
                    onChange={inputTextBio}
                  ></textarea>
                </div>
                <div className="flex pt-3 justify-between">
                  <p className="pr-3 translate-y-3">Your profile pic:</p>
                  <form className="flex">
                    {avatarSelected ? (
                      <div className="mr-2 pt-3">
                        <ImCheckmark />
                      </div>
                    ) : null}
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      className="roundButton fileInput"
                      onChange={selectAvatar}
                    />
                  </form>
                </div>
                <div className="flex pt-3 justify-between">
                  <p className="pr-3 translate-y-3">Your profile cover:</p>
                  <form className="flex">
                    {coverSelected ? (
                      <div className="mr-2 pt-3">
                        <ImCheckmark />
                      </div>
                    ) : null}
                    <input
                      type="file"
                      accept="/image/*"
                      className="roundButton fileInput"
                      onChange={selectCover}
                    />
                  </form>
                </div>
              </>
            ) : null}
            <div className="flex pt-3 justify-between">
              <p className="pr-3 translate-y-3">Dark theme:</p>
              <div className="roundButton" onClick={switchTheme}>
                {lightTheme ? "Off" : "On"}
              </div>
            </div>
            <div className="flex pt-3 justify-center">
              {currentUser ? (
                <div className="roundButton" onClick={logout}>
                  Sign Out
                </div>
              ) : (
                <LoginButton />
              )}
            </div>
          </div>
          <div className="pt-5 w-fit mx-auto text-lg">
            <div className="roundButton" onClick={saveAndClose}>
              Save & Close
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
