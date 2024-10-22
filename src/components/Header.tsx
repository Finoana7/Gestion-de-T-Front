function Header() {
  return (
    <header className="w-full h-max p-3">
      <div className="flex justify-between w-full h-max bg-white p-3 rounded-2xl shadow-lg">
        <div className="flex items-center justify-center gap-2">
          <i className="text-2xl -translate-y-2">🏍️</i>
          <h1 className='font-bold font-mono italic text-xl tag'>App</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border shadow-lg bg-emerald-400"></div>
          <div className="w-5 h-5 rounded-full border shadow-lg bg-indigo-400"></div>
          <div className="w-5 h-5 rounded-full bg-orange-400"></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
