import { useContext, useState, useEffect } from "react";
//Firebase
import { database } from "../firebaseConfig";
import { doc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
//App components
import { UserContext } from "../contexts/UserContextProvider";

export default function withSettingsData(Component) {
  return function withSettingsData(props) {
    const { updateNameOrBio, currentUserInfo } = useContext(UserContext);
    const [originalUserNameAndBio, setOriginalUserNameAndBio] = useState({
      name: currentUserInfo ? currentUserInfo.name : "",
      bio: currentUserInfo ? currentUserInfo.bio : "",
    });

    const updateUserInfo = function (inputName, inputBio) {
      console.log("Unmounting Settings...");
      console.log(originalUserNameAndBio.name, inputName);
      console.log(originalUserNameAndBio.bio, inputBio);
      if (
        originalUserNameAndBio.name !== inputName ||
        originalUserNameAndBio.bio !== inputBio
      ) {
        updateNameOrBio("name", inputName);
        updateNameOrBio("bio", inputBio);
        console.log("Name and bio updated!");
      }
    };

    useEffect(() => {
      setOriginalUserNameAndBio({
        name: currentUserInfo.name,
        bio: currentUserInfo.bio,
      });
    }, [currentUserInfo]);

    return <Component {...props} updateUserInfo={updateUserInfo} />;
  };
}
