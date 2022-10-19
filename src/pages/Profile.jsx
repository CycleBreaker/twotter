import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//Firebase
import { database } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
//App components
import ProfileTop from "../components/ProfileTop";
import Feed from "../components/Feed";
import Page404 from "../components/Page404";

export default function Profile(props) {
  const { getTwots, isTheSameUser, handleFollow, isFollowing } = props;
  const { userId } = useParams();
  const [userExists, setUserExists] = useState(true);
  const [twots, setTwots] = useState([]);

  const loadUserInfo = async function () {
    await getDoc(doc(database, "users", userId)).then((res) => {
      const getUserExists = res.exists();
      if (getUserExists) {
        setUserExists(true);
        loadMoreTwots();
      } else {
        setUserExists(false);
      }
    });
  };

  const loadMoreTwots = async function () {
    const newTwots = await getTwots(userId);
    setTwots(newTwots);
  };

  const deleteTwot = async function (deleteId) {
    const updatedTwots = twots.filter((tw) => tw.id !== deleteId);
    setTwots(updatedTwots);
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  return (
    <>
      {userExists ? (
        <>
          <ProfileTop
            userId={userId}
            isTheSameUser={isTheSameUser}
            handleFollow={handleFollow}
            isFollowing={isFollowing}
          />
          <Feed
            twots={twots}
            loadMoreTwots={loadMoreTwots}
            deleteTwot={deleteTwot}
            isTheSameUser={isTheSameUser}
            emptyMessage={`This person hasn't twotted anything yet.`}
          />
        </>
      ) : (
        <Page404 />
      )}
    </>
  );
}
