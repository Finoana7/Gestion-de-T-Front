import { BiLogOut } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { user_store } from "../store/user";

function Header() {
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  const {data: user} = user_store()

  return (
    <header className="w-full h-max p-3 pb-2">
      <div className="flex justify-between w-full h-max bg-white p-3 rounded-2xl shadow-lg">
        <Link to="/" className="flex items-center justify-center gap-1">
          <img src="/logo.png" alt="" className="w-10 h-7 invert" />
          <h1 className="font-bold font-mono text-lg tag">app</h1>
        </Link>

        <div className="flex items-center gap-4">
          {
            user?.Role === "admin" ?
            <Link
              to="/profiles"
              className="w-5 h-5 hover:scale-75 cursor-pointer transition-all"
            >
              <FaUsers className="text-indigo-400 w-full h-full" />
            </Link>
            : null
          }
          <button
            onClick={logout}
            title="logout"
            className="w-5 h-5 hover:scale-75 cursor-pointer transition-all"
          >
            <BiLogOut className="text-orange-400 w-full h-full" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
