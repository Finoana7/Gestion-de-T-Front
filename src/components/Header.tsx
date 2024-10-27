import { useNavigate } from "react-router-dom";

function Header() {

  const nav = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    nav("/login")
  }

  return (
    <header className="w-full h-max p-3 pb-2">
      <div className="flex justify-between w-full h-max bg-white p-3 rounded-2xl shadow-lg">
        <div className="flex items-center justify-center gap-1">
          <img src="/logo.png" alt="" className="w-10 h-7 invert"/>
          <h1 className='font-bold font-mono text-lg tag'>app</h1>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={logout} title="logout" className="w-4 h-4 rounded-full border shadow-lg bg-emerald-400 hover:scale-75 cursor-pointer transition-all"></button>
          <button onClick={logout} title="logout" className="w-4 h-4 rounded-full border shadow-lg bg-indigo-400 hover:scale-75 cursor-pointer transition-all"></button>
          <button onClick={logout} title="logout" className="w-4 h-4 rounded-full bg-orange-400 hover:scale-75 cursor-pointer transition-all"></button>
        </div>
      </div>
    </header>
  );
}

export default Header;
