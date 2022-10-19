//Firebase
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
//App components
import TwootComposer from "../components/TwootComposer";
import Feed from "../components/Feed";
import withHomeData from "../containers/withHomeData";
import withComposerData from "../containers/withComposerData";

//Higher-order components
const HomeFeedWithData = withHomeData(Feed);
const ComposerWithData = withComposerData(TwootComposer);

export default function Home() {
  return (
    <>
      <ComposerWithData />
      <HomeFeedWithData />
    </>
  );
}
