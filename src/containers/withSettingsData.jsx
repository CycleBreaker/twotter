import { useContext, useState, useEffect } from "react";
//Firebase
import { storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
//App components
import { UserContext } from "../contexts/UserContextProvider";

export default function withSettingsData(Component) {
  return function withSettingsData(props) {
    const { updateNameOrBioOrImages, currentUserInfo, currentUser } =
      useContext(UserContext);
    const [originalUserNameAndBio, setOriginalUserNameAndBio] = useState({
      name: currentUserInfo ? currentUserInfo.name : "",
      bio: currentUserInfo ? currentUserInfo.bio : "",
    });
    const [inputAvatar, setInputAvatar] = useState("");
    const [inputCover, setInputCover] = useState("");

    const selectImage = function (image, type) {
      if (type === "avatar") {
        setInputAvatar(image);
      } else if (type === "cover") {
        setInputCover(image);
      }
    };

    const updateUserInfo = function (inputName, inputBio) {
      if (
        originalUserNameAndBio.name !== inputName ||
        originalUserNameAndBio.bio !== inputBio
      ) {
        updateNameOrBioOrImages("name", inputName);
        updateNameOrBioOrImages("bio", inputBio);
      }
      if (inputAvatar) {
        const storageRef = ref(storage, currentUser + "/avatar");
        uploadBytes(storageRef, inputAvatar).then((url) =>
          getDownloadURL(storageRef).then((url) =>
            updateNameOrBioOrImages("userpic", url)
          )
        );
      }
      if (inputCover) {
        const storageRef = ref(storage, currentUser + "/cover");
        uploadBytes(storageRef, inputCover).then((url) =>
          getDownloadURL(storageRef).then((url) =>
            updateNameOrBioOrImages("userBackground", url)
          )
        );
      }
    };

    useEffect(() => {
      setOriginalUserNameAndBio({
        name: currentUserInfo ? currentUserInfo.name : "",
        bio: currentUserInfo ? currentUserInfo.bio : "",
      });
    }, [currentUserInfo]);

    return (
      <Component
        {...props}
        updateUserInfo={updateUserInfo}
        selectImage={selectImage}
      />
    );
  };
}
