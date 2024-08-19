import { PiCloverFill } from "react-icons/pi";
import { user_store } from "../store/user";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import init from "../utils/init";

function Header() {

  useEffect(init, [])
  const me = user_store(u => u.data)

  return (
    <div className="absolute flex items-center w-full min-h-10 bg-white border-b border-neutral-300">
      <nav>
        <div className="container">
          <Link to='/' className="logo flex items-center gap-2 font-bold font-mono italic menu-item">
            <PiCloverFill className="text-3xl"/>
            Juma
          </Link>
          <div className="search-bar">
            <i className="uil uil-search"></i>
            <input
              type="text"
              placeholder="Search for"
              className="border-none outline-none"
            />
          </div>
          <div className="create">
            <Link to='/login' className="profile-pic">
              <img src={me?.photo || '/nest.jpg'} alt="pic 1" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header