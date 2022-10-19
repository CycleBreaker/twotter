import OlyaAva from "../assets/ava-1.png";

export default function NeomorphTest() {
  return (
    <div className="w-screen">
      <div className="w-[800px] bg-slate-400 mx-auto p-5">
        <div className="flex">
          <input
            type="text"
            className="bg-slate-400 w-5/6 p-3 rounded-3xl shadow-[inset_-5px_-5px_5px_rgba(255,255,255,0.3),_inset_5px_5px_5px_rgba(0,0,0,0.3)]"
          />
          <div className="p-3 font-bold text-white rounded-3xl ml-7 shadow-[5px_5px_5px_1px_rgba(0,0,0,0.3),_-5px_-5px_5px_1px_rgba(255,255,255,0.3)]">
            POST
          </div>
        </div>
        <div className="w-10/12 h-50 mx-auto mt-5 rounded-3xl p-3 shadow-[5px_5px_5px_1px_rgba(0,0,0,0.3),_-5px_-5px_5px_1px_rgba(255,255,255,0.3)]">
          <div className="flex">
            <img
              src={OlyaAva}
              className="h-[200px] rounded-[50%] shadow-[5px_5px_5px_1px_rgba(0,0,0,0.3),_-5px_-5px_5px_1px_rgba(255,255,255,0.3)]"
            />
            <div className="p-5 font-Roboto">NAME</div>
          </div>
        </div>
      </div>
    </div>
  );
}
