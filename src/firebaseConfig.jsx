import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0LpF7HUKObvez5xg-xWgKlbzwGwgWAhc",
  authDomain: "twotter-fde64.firebaseapp.com",
  projectId: "twotter-fde64",
  storageBucket: "twotter-fde64.appspot.com",
  messagingSenderId: "696632197853",
  appId: "1:696632197853:web:7468c91a3a959cdf931134",
  measurementId: "G-C37WSNY13F",
  storageBucket: "gs://twotter-fde64.appspot.com",
};

//Initialize Firebase and services
const firebaseApp = initializeApp(firebaseConfig);
const authentication = getAuth(firebaseApp);
const googleLoginProvider = new GoogleAuthProvider();
const database = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

//Export Firebase and services
export { firebaseApp, authentication, googleLoginProvider, database, storage };
