import { useContext } from "react";
import { v4 as uuid } from "uuid";
//Firebase
import { doc, setDoc } from "firebase/firestore";
import { database } from "../firebaseConfig";
//App components
import { generateTimestamp } from "../utilities";
import { UserContext } from "../contexts/UserContextProvider";

export default function withComposerData(Component) {
  return function withComposerData(props) {
    const { currentUser } = useContext(UserContext);

    const postTwot = async function (text) {
      const newDocRef = doc(database, currentUser, uuid());
      await setDoc(newDocRef, {
        author: currentUser,
        content: text,
        date: generateTimestamp(),
        liked: [],
        wasEdited: false,
      });
    };

    return <Component postTwot={postTwot} />;
  };
}
