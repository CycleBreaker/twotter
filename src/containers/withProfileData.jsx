import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
//Firebase
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { database, storage } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
//Contexts
import { UserContext } from "../contexts/UserContextProvider";
//App components
import { twotsToDownloadAtOnce } from "../config";
//Boilerplate images
import noAvatar from "../assets/avatar-none.jpg";
import noCover from "../assets/background-none.jpg";

export default function withProfileData(Component) {
  return function withProfileData(props) {
    const { currentUser } = useContext(UserContext);
    const { userId } = useParams();

    const [isTheSameUser, setIsTheSameUser] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [profileAvatar, setProfileAvatar] = useState(noAvatar);
    const [profileCover, setProfileCover] = useState(noCover);
    const [twots, setTwots] = useState([]);
    const [noTwotsLeft, setNoTwotsLeft] = useState(false);

    const [lastLoadedTwot, setLastLoadedTwot] = useState(null);

    const loadMoreTwots = async function () {
      const twotArray = new Array();
      const userRef = await collection(database, userId);
      let q = null;
      if (lastLoadedTwot === null) {
        q = query(
          userRef,
          orderBy("date", "desc"),
          limit(twotsToDownloadAtOnce)
        );
      } else {
        q = query(
          userRef,
          orderBy("date", "desc"),
          startAfter(lastLoadedTwot),
          limit(twotsToDownloadAtOnce)
        );
      }
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        twotArray.push({ id: doc.id, ...doc.data() });
        setLastLoadedTwot(querySnapshot.docs[querySnapshot.docs.length - 1]);
      });
      if (querySnapshot.size === 0) {
        setNoTwotsLeft(true);
      }
      setTwots([...twots, ...twotArray]);
    };

    const deleteTwotFromState = function (id) {
      const updatedTwotList = twots.filter((tw) => tw.id !== id);
      setTwots(updatedTwotList);
    };

    const handleFollow = async function () {
      const userDocRef = doc(database, "users", currentUser);
      let copiedFollowList = null;
      await getDoc(userDocRef).then(
        (doc) => (copiedFollowList = doc.data().following)
      );
      if (isFollowing) {
        copiedFollowList = copiedFollowList.filter((flw) => flw !== userId);
      } else {
        copiedFollowList.push(userId);
      }
      await updateDoc(userDocRef, {
        following: copiedFollowList,
      }).then(() => {
        setIsFollowing(!isFollowing);
      });
    };

    const checkIfFollowing = async function () {
      const userDocRef = doc(database, "users", currentUser);
      let copiedFollowList = null;
      await getDoc(userDocRef).then((doc) => {
        copiedFollowList = doc.data().following;
      });
      for (let i = 0; i < copiedFollowList.length; i++) {
        if (copiedFollowList[i] === userId) {
          setIsFollowing(true);
          break;
        }
      }
    };

    useEffect(() => {
      const avatarRef = ref(storage, userId + "/avatar");
      const avatarUrl = getDownloadURL(avatarRef).then(
        (url) => {
          setProfileAvatar(url);
        },
        (err) => console.log(err)
      );
      const coverRef = ref(storage, userId + "/cover");
      const coverUrl = getDownloadURL(coverRef).then(
        (url) => {
          setProfileCover(url);
        },
        (err) => console.log(err)
      );
      const unsubscribe = onSnapshot(doc(database, "users", userId), (doc) => {
        console.log(doc);
        setProfileAvatar(doc.data().userpic);
        setProfileCover(doc.data().userBackground);
      });
      return () => unsubscribe();
    }, []);

    useEffect(() => {
      checkIfFollowing();
    });

    useEffect(() => {
      if (currentUser === userId) {
        setIsTheSameUser(true);
      } else {
        setIsTheSameUser(false);
      }
    }, [currentUser]);

    return (
      <Component
        twots={twots}
        loadMoreTwots={loadMoreTwots}
        emptyMessage={
          isTheSameUser
            ? "Post something to fill your feed."
            : "This person hasn't twotted anything yet."
        }
        noTwotsLeft={noTwotsLeft}
        isTheSameUser={isTheSameUser}
        handleFollow={handleFollow}
        isFollowing={isFollowing}
        deleteTwotFromState={deleteTwotFromState}
        profileAvatar={profileAvatar}
        profileCover={profileCover}
      />
    );
  };
}
