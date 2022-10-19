import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
//Firebase
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { database } from "../firebaseConfig";
//Contexts
import { UserContext } from "../contexts/UserContextProvider";

export default function withProfileData(Component) {
  return function withProfileData(props) {
    const { currentUser } = useContext(UserContext);
    const { userId } = useParams();

    const [isTheSameUser, setIsTheSameUser] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const twotsToDownloadAtOnce = 10;
    const [twotsDownloaded, setTwotsDownloaded] = useState(
      twotsToDownloadAtOnce
    );

    const getTwots = async function (userId) {
      const twotArray = new Array();
      const q = query(
        collection(database, userId),
        orderBy("date", "desc"),
        limit(twotsDownloaded)
      );
      await getDocs(q)
        .then((res) =>
          res.forEach((doc) => twotArray.push({ id: doc.id, ...doc.data() }))
        )
        .catch((err) => console.log(err));
      return twotArray;
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
      console.log(copiedFollowList);
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
        {...props}
        getTwots={getTwots}
        isTheSameUser={isTheSameUser}
        handleFollow={handleFollow}
        isFollowing={isFollowing}
      />
    );
  };
}
