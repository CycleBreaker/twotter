import { useContext } from "react";
//Contexts
import { UserContext } from "../contexts/UserContextProvider";
//App components
import LoginButton from "./LoginButton";
import { textInputHook } from "../hooks";
//Icons
import { RiSendPlane2Fill } from "react-icons/ri";

function LoggedInState(props) {
  const { postTwot } = props;
  const [inputContent, inputTextContent, resetContent] = textInputHook("");

  const sendTwoot = async function () {
    await postTwot(inputContent);
    resetContent();
  };

  return (
    <>
      <input
        type="text"
        className="textInputField w-full"
        value={inputContent}
        onChange={inputTextContent}
      />
      <div className="roundButton text-2xl ml-5" onClick={sendTwoot}>
        <RiSendPlane2Fill />
      </div>
    </>
  );
}

export default function TwootComposer(props) {
  const { currentUser } = useContext(UserContext);
  const { postTwot } = props;

  return (
    <div className="w-full md:w-[800px] mx-auto px-5 py-10 flex">
      {currentUser ? <LoggedInState postTwot={postTwot} /> : <LoginButton />}
    </div>
  );
}
