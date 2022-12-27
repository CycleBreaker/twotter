//App components
import Feed from "../components/Feed";
import withDiscoverData from "../containers/withDiscoverData";

//Higher-order components
const FeedWithDiscoverData = withDiscoverData(Feed);

export default function Discover() {
  return (
    <div className="mt-10">
      <FeedWithDiscoverData />
    </div>
  );
}
