import { FaArrowLeft, FaUserPlus } from "react-icons/fa";
import { useProfiles, useRole } from "../hook/data";
import { Link, useNavigate } from "react-router-dom";
import AddProfile from "./AddProfile";
import { useEffect } from "react";

function Profiles() {
  const role = useRole();
  const { data: users } = useProfiles();

  const nav = useNavigate();

  useEffect(() => {
    role === "admin" ? null : nav("/")
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full h-max mt-3">
      <AddProfile />
      <div className="flex justify-between gap-3">
        <div className="flex items-center gap-4">
          <Link to="/historic">
            <FaArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold">Profiles</h1>
        </div>
        <button
          onClick={() => nav("?add=true")}
          className="flex items-center gap-2 w-max font-bold text-indigo-600 bg-white px-4 py-1 rounded-xl border shadow"
        >
          <FaUserPlus />
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-3 w-full">
        {users?.map((user) => (
          <div
            key={user.Id}
            className="flex justify-start items-center gap-4 w-max h-max border p-2 pr-6 rounded-lg inset-0 backdrop-blur-md bg-white/70"
          >
            <img
              src={`/nest.jpg`}
              alt=""
              className="bg-white w-12 h-12 rounded-full shadow border border-neutral-300"
            />
            <div className="flex flex-col gap-1 justify-between font-bold">
              <h2>{user?.Name}</h2>
              <div className={`text-xs text-white w-max h-max py-[1px] px-[3px] rounded ${
                (() => {
                  switch (user?.Role) {
                    case "admin":
                      return "bg-emerald-500/80"
                    case "editeur":
                      return "bg-indigo-500/80"
                    case "observateur":
                      return "bg-orange-500/80"
                    default:
                      break;
                  }
                })()
              }`}>
                {user?.Role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profiles;
