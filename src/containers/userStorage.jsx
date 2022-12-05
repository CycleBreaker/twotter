import { useState, useEffect } from "react";
//Firebase
import {
  authentication,
  googleLoginProvider,
  database,
} from "../firebaseConfig";
import {
  signInWithPopup,
  onAuthStateChanged,
  getAdditionalUserInfo,
  signOut,
} from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
//App components
import { newUserBoilerplate } from "../config";

export default function userStorage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [currentUserImages, setCurrentUserImages] = useState({
    avatar: "gs://twotter-fde64.appspot.com/avatar-none.jpg",
    background: "gs://twotter-fde64.appspot.com/background-none.jpg",
  });

  const launchLoginProcess = async function () {
    let credentials;
    try {
      credentials = await signInWithPopup(authentication, googleLoginProvider);
    } catch (error) {
      throw error;
    } finally {
      const additionalUserInfo = getAdditionalUserInfo(credentials);
      if (additionalUserInfo.isNewUser) {
        setTimeout(async () => {
          await setDoc(doc(database, "users", credentials.user.uid), {
            ...newUserBoilerplate,
            name: credentials.user.displayName,
            userpic: credentials.user.photoURL,
          });
          setCurrentUserImages({
            ...currentUserImages,
            userpic: credentials.user.photoURL,
          });
        }, 300);
      }
    }
  };

  const refreshNameAndBio = async function (curUser) {
    await getDoc(doc(database, "users", curUser))
      .then((res) => {
        setCurrentUserInfo({
          ...currentUserInfo,
          name: res.data().name,
          bio: res.data().bio,
        });
      })
      .catch((err) => console.log(err));
  };

  const getFollowingList = async function () {
    const userDocRef = doc(database, "users", currentUser);
    let followingList = null;
    await getDoc(userDocRef)
      .then((usr) => {
        followingList = usr.data().following;
      })
      .catch((err) => {
        console.log(err);
      });
    return followingList;
  };

  const logout = async function () {
    try {
      signOut(authentication);
    } catch (error) {
      throw error;
    } finally {
    }
  };

  const updateNameOrBioOrImages = async function (type, text) {
    await updateDoc(doc(database, "users", currentUser), { [type]: text })
      .then((res) => refreshNameAndBio(currentUser))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const unsubscribeFromAuth = onAuthStateChanged(authentication, (user) => {
      if (user) {
        setCurrentUser(user.uid);
        refreshNameAndBio(user.uid);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribeFromAuth();
  }, []);

  return {
    currentUser,
    currentUserInfo,
    currentUserImages,
    launchLoginProcess,
    logout,
    updateNameOrBioOrImages,
    getFollowingList,
  };
}
