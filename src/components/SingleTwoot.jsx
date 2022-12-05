import { useEffect } from "react";
//React Router
import { Link } from "react-router-dom";
//App components
import { dateFormatWithTime } from "../config";
import { textInputHook } from "../hooks";
//Icons
import { MdEdit } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { FaHeart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { RiSendPlane2Fill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";

export default function SingleTwoot(props) {
  const {
    id,
    author,
    avatar,
    authorId,
    content,
    date,
    likes,
    isLiked,
    isTheSameUser,
    like,
    wasEdited,
    switchEditingMode,
    updateTwoot,
    editingMode,
    deleteTwoot,
  } = props;
  //Hooks
  const [inputContent, inputTextContent, resetContent] = textInputHook(
    content ? content : ""
  );

  const handleUpdateClick = () => {
    updateTwoot(inputContent);
  };

  useEffect(() => {
    inputTextContent({ target: { value: content } });
  }, [content]);

  return (
    <>
      <div className="flex">
        <img
          src={avatar}
          alt="userpic"
          className="rounded-[50%] h-20 w-20 p-1 shadow-[5px_5px_5px_1px_rgba(0,0,0,0.3),_-5px_-5px_5px_1px_rgba(255,255,255,0.5)] dark:shadow-[5px_5px_5px_1px_rgba(0,0,0,0.5),_-5px_-5px_5px_1px_rgba(255,255,255,0.2)]"
        />
        <div className="pl-5 w-full">
          <div className="flex justify-between w-auto">
            <Link to={"/" + authorId}>
              <div className="font-bold">{author}</div>
            </Link>
            <div>
              {wasEdited ? "edited " : null}
              {new Intl.DateTimeFormat("en-IE", dateFormatWithTime).format(
                new Date(date.seconds * 1000)
              )}
            </div>
          </div>
          {editingMode ? (
            <textarea
              type="text"
              rows="2"
              className="textInputField w-full"
              value={inputContent}
              onChange={inputTextContent}
            ></textarea>
          ) : (
            <div className="pt-3">{content}</div>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        {editingMode ? (
          <>
            <div className="roundButton ml-3" onClick={switchEditingMode}>
              <IoMdCloseCircle />
            </div>
            <div className="roundButton ml-3" onClick={handleUpdateClick}>
              <RiSendPlane2Fill />
            </div>
          </>
        ) : (
          <>
            <div className="roundButton flex ml-3" onClick={like}>
              {isLiked ? <FcLike /> : <FaHeart />}
              <p className="text-xs translate-y-[1px] pl-1">{likes}</p>
            </div>
            {isTheSameUser ? (
              <>
                <div className="roundButton ml-3" onClick={switchEditingMode}>
                  <MdEdit />
                </div>
                <div className="roundButton ml-3" onClick={deleteTwoot}>
                  <AiFillDelete />
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}
