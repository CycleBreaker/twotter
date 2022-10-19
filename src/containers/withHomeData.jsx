import { useState, useEffect, useContext } from "react";
//Firebase
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import { database } from "../firebaseConfig";
//Contexts
import { UserContext } from "../contexts/UserContextProvider";

export default function withHomeData(Component) {
  return function withHomeData(props) {
    const [followingList, setFollowingList] = useState([]);
    const [twotsToDownloadPerFollow, setTwotsToDownloadPerFollow] = useState(8);
    const [twotsLoaded, setTwotsLoaded] = useState(0);
    const [twots, setTwots] = useState(new Array());

    const { currentUser, getFollowingList } = useContext(UserContext);

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

    useEffect(() => {
      const updateFollowingList = async function () {
        const theList = await getFollowingList();
        setFollowingList(theList);
      };
      if (currentUser !== null) {
        updateFollowingList();
      }
    }, [currentUser]);

    return (
      <Component
        twots={twots}
        //loadMoreTwots={}
        emptyMessage={`Follow someone you're interested in to fill your feed.`}
      />
    );
  };
}
