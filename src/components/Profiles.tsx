import { FaArrowLeft, FaUserPlus } from "react-icons/fa";
import { useProfiles, useRole } from "../hook/data";
import { Link, useNavigate } from "react-router-dom";
import AddProfile from "./AddProfile";
import { useEffect, useMemo } from "react";
import { user_store } from "../store/user";
import { User } from "../api/auth";
import useQuery from "../hook/useQuery";
import { deleteUser } from "../api/user";
import toast from "react-hot-toast";
import { image } from "../utils/image";

export default function Profiles() {
  const role = useRole();
  const { data: users, reFetch } = useProfiles();
  const { data: me } = user_store();

  const nav = useNavigate();

  useEffect(() => {
    role === "admin" ? null : nav("/");
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full h-max mt-3">
      <AddProfile />
      <Profile users={users} reFetch={reFetch}/>
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
          Ajouter
        </button>
      </div>
      <div className="flex flex-wrap gap-3 w-full">
        {users?.map((user) => (
          <Link
            to={me?.ID !== user.ID ? `?id=${user.ID}` : "?"}
            key={user.ID}
            className="flex justify-start items-center gap-4 w-max h-max border p-2 pr-6 rounded-lg inset-0 backdrop-blur-md bg-white/70 transition-all hover:scale-105"
          >
            <img
              src={image(user?.Name)}
              alt=""
              className="bg-white w-12 h-12 rounded-full shadow border border-neutral-300"
            />
            <div className="flex flex-col gap-1 justify-between font-bold">
              <h2>{user?.Name}</h2>
              <div
                className={`text-xs text-white w-max h-max py-[1px] px-[3px] rounded ${(() => {
                  switch (user?.Role) {
                    case "admin":
                      return "bg-emerald-500/80";
                    case "editeur":
                      return "bg-indigo-500/80";
                    case "observateur":
                      return "bg-orange-500/80";
                    default:
                      break;
                  }
                })()}`}
              >
                {user?.Role}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Profile({ users, reFetch }: { users: User[], reFetch: () => Promise<void> }) {
  const id = useQuery("id");

  if (!id) {
    return <></>;
  }

  const nav = useNavigate();

  const user = useMemo(() => {
    return users?.find((usr) => usr.ID === id);
  }, [id]);

  const deleting = async () => {
    await deleteUser(id)
    .then(() => {
      toast.success("success !")
      reFetch()
      nav("?")
    })
    .catch((err) => {
      toast.error(err.response?.message)
    })
  }

  return (
    <div className="absolute z-50 flex items-center justify-center w-screen h-screen inset-0 backdrop-blur-[2px] bg-black/50">
      <div className="flex flex-col items-center px-4 py-3 gap-10 w-[25rem] bg-white rounded-xl">
        <div className="flex justify-start items-start gap-4 w-full border p-2 rounded-xl shadow">
          <img
            src={image(user?.Name)}
            alt=""
            className="bg-white w-14 h-14 rounded-full shadow border border-neutral-300"
          />
          <div className="flex flex-col gap-2 justify-between">
            <h1 className="text-xl text-center">{user?.Role.toUpperCase()}</h1>
            <h2>{user?.Name}</h2>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <button onClick={() => nav("?")} className="w-full font-bold text-indigo-600 bg-white px-4 py-2 rounded-xl border">
            retour
          </button>
          <button onClick={deleting} className="w-full font-bold bg-red-500 text-white px-4 py-2 rounded-xl">
            supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
