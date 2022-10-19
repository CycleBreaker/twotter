import { useContext } from "react";
//Contexts
import { UserContext } from "../contexts/UserContextProvider";
//Icons
import { BsGoogle } from "react-icons/bs";

export default function LoginButton() {
  const { launchLoginProcess } = useContext(UserContext);
  return (
    <div className="roundButton flex mx-auto" onClick={launchLoginProcess}>
      <div className="p-3 translate-y-[4px]">
        <BsGoogle />
      </div>
      <div className="w-[1px] bg-textLight dark:bg-textDark" />
      <div className="p-3">Login with Google</div>
    </div>
  );
}
