//App components
import SingleTwoot from "./SingleTwoot";
import withTwootData from "../containers/withTwootData";
import NoTwots from "./NoTwots";

function Divider() {
  return <div className="h-[1px] mx-1 my-5 bg-textLight dark:bg-textDark" />;
}

//Higher-order components
const SingleTwootWithData = withTwootData(SingleTwoot);

export default function Feed(props) {
  const {
    twots,
    loadMoreTwots,
    deleteTwotFromState,
    isTheSameUser,
    emptyMessage,
    noTwotsLeft,
  } = props;

  return (
    <>
      <div className="rounded-3xl w-11/12 md:w-[800px] mx-auto relative shadow-[5px_5px_5px_1px_rgba(0,0,0,0.3),_-5px_-5px_5px_1px_rgba(255,255,255,0.5)] dark:shadow-[5px_5px_5px_1px_rgba(0,0,0,0.5),_-5px_-5px_5px_1px_rgba(255,255,255,0.2)] p-4">
        {twots.map((tw, i) => (
          <div key={tw.id}>
            <SingleTwootWithData
              twoot={tw}
              isTheSameUser={isTheSameUser}
              deleteTwotFromState={deleteTwotFromState}
            />
            {i !== twots.length - 1 ? <Divider /> : null}
          </div>
        ))}
        {twots.length === 0 ? <NoTwots message={emptyMessage} /> : null}
        {noTwotsLeft || twots.length === 0 ? null : (
          <div>
            <Divider />
            <div
              className="font-bold p-5 w-fit mx-auto cursor-pointer"
              onClick={loadMoreTwots}
            >
              LOAD MORE
            </div>
          </div>
        )}
      </div>
      <div className="h-10" />
    </>
  );
}
