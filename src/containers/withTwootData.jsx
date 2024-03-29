import { useState, useContext, useEffect } from "react";
//Firebase
import { database } from "../firebaseConfig";
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { storage } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
//App components
import { getUserData } from "../utilities";
import { UserContext } from "../contexts/UserContextProvider";
import { generateTimestamp } from "../utilities";
//Boilerplate images
import noAvatar from "../assets/avatar-none.jpg";

export default function withTwootData(Component) {
  return function withTwootData(props) {
    const { twoot, deleteTwotFromState, isTheSameUser } = props;
    const { id, author, content, date, liked, wasEdited } = twoot;
    const { currentUser } = useContext(UserContext);

    const [userName, setUserName] = useState("Loading data...");
    const [avatar, setAvatar] = useState(noAvatar);

    const [isLiked, setIsLiked] = useState(false);
    const [actualContent, setActualContent] = useState("");
    const [likes, setLikes] = useState(0);
    const [editingMode, setEditingMode] = useState(false);

    const checkIfLiked = function () {
      for (let i = 0; i < liked.length; i++) {
        if (liked[i].trim() === currentUser) {
          setIsLiked(true);
          break;
        }
      }
    };

    const like = async function () {
      const twootRef = doc(database, author, id);
      let currentLikedList = null;
      await getDoc(twootRef).then(
        (res) => (currentLikedList = res.data().liked)
      );
      let twootIsLiked = false;
      for (let i = 0; i < currentLikedList.length; i++) {
        if (currentLikedList[i] === currentUser) {
          twootIsLiked = true;
          currentLikedList.splice(i, 1);
          break;
        }
      }
      if (!twootIsLiked) {
        currentLikedList.push(currentUser);
      }
      await updateDoc(twootRef, { liked: currentLikedList })
        .then(() => {
          setIsLiked(!isLiked);
          if (isLiked) {
            setLikes(likes - 1);
          } else {
            setLikes(likes + 1);
          }
        })
        .catch((err) => console.log(err));
    };

    const switchEditingMode = () => {
      setEditingMode(!editingMode);
    };

    const updateTwoot = async function (updatedContent) {
      const twootRef = doc(database, author, id);
      await updateDoc(twootRef, {
        content: updatedContent,
        wasEdited: true,
        date: generateTimestamp(),
      })
        .then((res) => {
          setEditingMode(false);
        })
        .catch((err) => console.log(err));
    };

    const deleteTwoot = async function () {
      const twootRef = doc(database, author, id);
      await deleteDoc(twootRef)
        .then((res) => deleteTwotFromState(id))
        .catch((err) => console.log(err));
    };

    useEffect(() => {
      setActualContent(content);
      checkIfLiked();
      getUserData(author).then((res) => setUserName(res.name));

      const avatarRef = ref(storage, author + "/avatar");
      const avatarUrl = getDownloadURL(avatarRef).then(
        (url) => {
          setAvatar(url);
        },
        (err) => console.log(err)
      );
    }, []);

    return (
      <Component
        authorId={author}
        author={userName}
        avatar={avatar}
        content={actualContent}
        date={date}
        like={currentUser === null ? null : like}
        likes={likes}
        isLiked={isLiked}
        isTheSameUser={isTheSameUser}
        editingMode={editingMode}
        wasEdited={wasEdited}
        switchEditingMode={switchEditingMode}
        updateTwoot={updateTwoot}
        deleteTwoot={deleteTwoot}
      />
    );
  };
}
