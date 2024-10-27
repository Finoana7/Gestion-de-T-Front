import { FaArrowLeft, FaPlusCircle } from "react-icons/fa";
import { useProfiles } from "../hook/data";
import { Link } from "react-router-dom";

function Profiles() {
  const { data: users } = useProfiles();

  return (
    <div className="flex flex-col gap-3 w-full h-max mt-3">
      <div className="flex justify-between gap-3">
        <div className="flex items-center gap-4">
          <Link to="/historic">
            <FaArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold"> All profiles</h1>
        </div>
        <button className="flex items-center gap-2 w-max font-bold text-indigo-600 bg-white px-4 py-1 rounded-xl border shadow">
          <FaPlusCircle/>
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-3 w-full">
        {users?.map((user) => (
          <div className="flex justify-start items-center gap-4 w-max h-max border p-2 pr-6 rounded-lg inset-0 backdrop-blur-md bg-white/70">
            <img
              src={`/nest.jpg`}
              alt=""
              className="bg-white w-12 h-12 rounded-full shadow border border-neutral-300"
            />
            <div className="flex flex-col gap-1 justify-between font-bold">
              <h2>{user?.Name}</h2>
              <h1 className="text-xs text-white w-max h-max py-[1px] px-[3px] bg-lime-500/80 rounded">
                {user?.Role}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profiles;
