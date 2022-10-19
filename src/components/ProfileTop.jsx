import { useContext, useState, useEffect } from "react";
//Contexts
import { ThemeContext } from "../contexts/ThemeContextProvider";
//App components
import { getUserData } from "../utilities";
//TEMP
import OlyaBg from "../assets/bg-1.jpg";
import OlyaAva from "../assets/ava-1.png";

export default function ProfileTop(props) {
  const { lightTheme } = useContext(ThemeContext);
  const { userId, isTheSameUser, handleFollow, isFollowing } = props;

  const [userData, setUserData] = useState({
    name: "Loading...",
    bio: "Loading...",
  });

  useEffect(() => {
    getUserData(userId).then((res) =>
      setUserData({ name: res.name, bio: res.bio })
    );
  }, []);

  return (
    <div>
      <img
        src={OlyaBg}
        alt="userBg"
        className="absolute h-[420px] w-full object-cover object-center z-1"
      />
      <div
        className={`absolute h-[420px] w-full z-2 ${
          lightTheme ? "profileGradientLight" : "profileGradientDark"
        }`}
      />
      <div className="h-[420px] w-full">
        <div className="grid h-[420px] md:w-[800px] w-full mx-auto grid-rows-2 grid-cols-3 gap-x-[50px] relative">
          <img
            src={OlyaAva}
            alt="userpic"
            className="row-start-2 row-end-3 col-start-1 col-end-2 bg-backgroundLight dark:bg-backgroundDark rounded-[50%] md:w-[240px] w-[160px] aspect-square p-1 absolute bottom-5 left-10 z-4 shadow-[5px_5px_5px_1px_rgba(0,0,0,0.3),_-5px_-5px_5px_1px_rgba(255,255,255,0.5)] dark:shadow-[5px_5px_5px_1px_rgba(0,0,0,0.5),_-5px_-5px_5px_1px_rgba(255,255,255,0.2)]"
          />
          <div className="row-start-2 row-end-3 col-start-2 col-end-4 w-full text-right md:p-[0_0_20px_20px] p-[0_20px_20px_20px] absolute bottom-3">
            <div className="relative z-3 md:text-3xl text-xl font-bold">
              {userData.name}
            </div>
            {isTheSameUser ? null : (
              <div className="flex justify-end p-1 z-3 relative">
                <div
                  className="roundButton w-fit bg-accentLight text-backgroundLight dark:bg-accentDark dark:text-backgroundDark"
                  onClick={handleFollow}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </div>
              </div>
            )}
            <div className="relative z-3 md:text-xl text">{userData.bio}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
