import { useState, useEffect, useContext } from "react";
//Firebase
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { database } from "../firebaseConfig";
//Contexts
import { UserContext } from "../contexts/UserContextProvider";
//App components
import { twotsToDownloadAtOnce } from "../config";

export default function withHomeData(Component) {
  return function withHomeData(props) {
    const [followingList, setFollowingList] = useState([]);
    const [lastTwotRefs, setLastTwotRefs] = useState(new Array());
    const [numberOfFollow, setNumberOfFollow] = useState(0);
    const [twots, setTwots] = useState(new Array());
    const [subscribedToUpdates, setSubscribeToUpdates] = useState(false);
    const [noTwotsLeft, setNoTwotsLeft] = useState(false);

    const { currentUser, getFollowingList } = useContext(UserContext);

    const getFollowingTwots = async function () {
      const twootArray = new Array();
      const lastTwotsRefsArray = lastTwotRefs;
      let emptyProfiles = 0;
      if (followingList.length === 0) {
        return;
      }
      for (let i = numberOfFollow; i < twotsToDownloadAtOnce; i++) {
        let followIndex = i;
        if (followIndex >= followingList.length) {
          followIndex = followIndex % followingList.length;
        }
        const userRef = await collection(database, followingList[followIndex]);
        let q = null;
        if (lastTwotsRefsArray.length === followingList.length) {
          q = query(
            userRef,
            orderBy("date", "desc"),
            startAfter(lastTwotsRefsArray[followIndex]),
            limit(1)
          );
        } else {
          q = query(userRef, orderBy("date", "desc"), limit(1));
        }
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          twootArray.push({ id: doc.id, ...doc.data() });
          lastTwotsRefsArray[followIndex] = querySnapshot.docs[0];
        });
        if (querySnapshot.size === 0) {
          emptyProfiles++;
        }
        if (emptyProfiles === followingList.length) {
          setNoTwotsLeft(true);
        }
        if (i === twotsToDownloadAtOnce - 1) {
          setNumberOfFollow(followIndex);
        }
      }
      setLastTwotRefs(lastTwotsRefsArray);
      setTwots([...twots, ...twootArray]);
    };

    const addNewTwot = function (twt) {
      console.log(twots);
      console.log(twt);
    };

    const clearFeed = () => {
      setTwots(new Array());
      setLastTwotRefs(new Array());
      setNumberOfFollow(0);
    };

    useEffect(() => {
      getFollowingTwots();
    }, [followingList]);

    useEffect(() => {
      const updateFollowingList = async function () {
        const theList = await getFollowingList();
        setFollowingList(theList);
      };
      if (currentUser !== null) {
        updateFollowingList();
      }
      let unsubscribeFromTwootUpdates = () => {
        return;
      };
      if (!subscribedToUpdates && currentUser) {
        const collectionRef = collection(database, currentUser);
        unsubscribeFromTwootUpdates = onSnapshot(collectionRef, async () => {
          const q = query(collectionRef, orderBy("date", "desc"), limit(1));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            addNewTwot({ id: doc.id, ...doc.data() });
          });
        });
        setSubscribeToUpdates(true);
      }
      if (currentUser) {
        clearFeed();
      }
      return () => unsubscribeFromTwootUpdates();
    }, [currentUser]);

    return (
      <Component
        twots={twots}
        loadMoreTwots={getFollowingTwots}
        emptyMessage={`Follow someone you're interested in to fill your feed.`}
        noTwotsLeft={noTwotsLeft}
      />
    );
  };
}
