import { useState, useEffect } from "react";
//Firebase
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { database } from "../firebaseConfig";
//App components
import { editorsPicks, pickedTwotsAmount, randomTwotsPerUser } from "../config";

export default function withDiscoverData(Component) {
  return function withDiscoverData(props) {
    const [twots, setTwots] = useState([]);

    const loadMoreTwots = async function () {
      const finalTwotArray = [];
      const getRawTwots = async function (collectionRef) {
        const rawTwotArray = [];
        let q = query(
          collectionRef,
          orderBy("date", "desc"),
          limit(randomTwotsPerUser)
        );
        await getDocs(q).then((res) => {
          res.forEach((tw) => {
            rawTwotArray.push({ id: tw.id, ...tw.data() });
          });
        });
        return rawTwotArray;
      };

      const cyclePromise = new Promise((resolve, reject) => {
        editorsPicks.forEach(async (usr, i) => {
          const collectionRef = await collection(database, usr);
          const result = await getRawTwots(collectionRef);
          finalTwotArray.push(...result);
          if (i === editorsPicks.length - 1) resolve();
        });
      });

      const shuffleArray = function (arr) {
        const copiedArray = [...arr];
        const shuffledArray = [];
        let currentIndex = arr.length - 1;
        while (currentIndex >= 0) {
          const randomIndex = Math.floor(Math.random() * currentIndex);
          shuffledArray.push(copiedArray[randomIndex]);
          copiedArray.splice(randomIndex, 1);
          currentIndex--;
        }
        return shuffledArray;
      };

      cyclePromise.then(() => {
        const finalFinalArray = shuffleArray(finalTwotArray);
        setTwots(Array.from(finalFinalArray));
      });
    };

    useEffect(() => {
      loadMoreTwots();
    }, []);

    return (
      <Component
        twots={twots}
        loadMoreTwots={loadMoreTwots}
        emptyMessage="Loading discovered twots..."
        noTwotsLeft={true}
      />
    );
  };
}
