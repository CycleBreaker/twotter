import { useContext } from "react";
//React Router
import { Link } from "react-router-dom";
//Contexts
import { ThemeContext } from "../contexts/ThemeContextProvider";
//Icons
import { AiFillHome } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";

export default function Home() {
  const { switchSettingsPopupOn } = useContext(ThemeContext);
  return (
    <div className="bg-backgroundLight text-headingLight dark:bg-backgroundDark dark:text-headingDark p-3 font-bold text-2xl uppercase flex shadow-xl z-[999] sticky top-0">
      <div className="w-full md:w-[800px] mx-auto flex justify-between">
        <p className="translate-y-[10px]">Twotter</p>
        <div className="flex">
          <div className="roundButton">
            <Link to="/">
              <AiFillHome />
            </Link>
          </div>
          <div className="roundButton ml-5" onClick={switchSettingsPopupOn}>
            <IoSettingsSharp />
          </div>
        </div>
      </div>
    </div>
  );
}
