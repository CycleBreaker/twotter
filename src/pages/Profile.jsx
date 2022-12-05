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
  const {
    twots,
    loadMoreTwots,
    deleteTwotFromState,
    noTwotsLeft,
    isTheSameUser,
    handleFollow,
    isFollowing,
    profileAvatar,
    profileCover,
  } = props;
  const { userId } = useParams();
  const [userExists, setUserExists] = useState(true);

  const loadUserInfo = async function () {
    await getDoc(doc(database, "users", userId)).then((res) => {
      const getUserExists = res.exists();
      if (getUserExists) {
        setUserExists(true);
      } else {
        setUserExists(false);
      }
    });
  };

  useEffect(() => {
    loadUserInfo();
    loadMoreTwots();
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
            profileAvatar={profileAvatar}
            profileCover={profileCover}
          />
          <Feed
            twots={twots}
            loadMoreTwots={loadMoreTwots}
            deleteTwotFromState={deleteTwotFromState}
            emptyMessage={
              isTheSameUser
                ? "Post something to fill your feed."
                : "This person hasn't twotted anything yet."
            }
            noTwotsLeft={noTwotsLeft}
            isTheSameUser={isTheSameUser}
          />
        </>
      ) : (
        <Page404 />
      )}
    </>
  );
}
