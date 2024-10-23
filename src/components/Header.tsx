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
        <div className="flex items-center justify-center gap-2">
          <i className="text-2xl -translate-y-2">🏍️</i>
          <h1 className='font-bold font-mono italic text-xl tag'>App</h1>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={logout} title="logout" className="w-5 h-5 rounded-full border shadow-lg bg-emerald-400 hover:scale-75 cursor-pointer transition-all"></button>
          <button onClick={logout} title="logout" className="w-5 h-5 rounded-full border shadow-lg bg-indigo-400 hover:scale-75 cursor-pointer transition-all"></button>
          <button onClick={logout} title="logout" className="w-5 h-5 rounded-full bg-orange-400 hover:scale-75 cursor-pointer transition-all"></button>
        </div>
      </div>
    </header>
  );
}

export default Header;
