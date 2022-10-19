//Firebase
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { database } from "./firebaseConfig";

export const getUserData = async function (userId) {
  let userName = "Loading user data...";
  await getDoc(doc(database, "users", userId)).then(
    (res) => (userName = res.data())
  );
  return userName;
};

export const generateTimestamp = function () {
  const currentDateJs = new Date();
  return Timestamp.fromDate(currentDateJs);
};
