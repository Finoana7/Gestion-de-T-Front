import React from "react";
import { useSold } from "../hook/data";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

type Props = React.PropsWithChildren;

export default function Layout({ children }: Props) {
  const { data: sold } = useSold();

  const nav = useNavigate();

  return (
    <div className="flex justify-between gap-3 w-full h-full p-1 rounded-lg bg-[url('/prisma.avif')] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col gap-3 min-w-[17rem] h-full">
        <Profile />

        <div className="flex flex-col justify-between w-full h-full rounded-xl shadow-lg border p-2 inset-0 backdrop-blur-lg bg-white">
          <div className="flex flex-col items-center gap-3 w-full h-max p-5 rounded-xl border-2 border-dashed bg-white">
            <h1 className="font-bold italic text-2xl underline">Solde</h1>
            <div className="text-2xl font-mono">{JSON.stringify(sold)} Ar</div>
          </div>
          <div className="flex flex-col gap-3 w-full h-max">
            <button
              onClick={() => nav("/profiles")}
              className="font-bold text-indigo-600 bg-white px-4 py-2 rounded-xl border shadow hover:shadow-lg transition-all"
            >
              <FaUsers className="mr-3 inline -translate-y-1" />
              Tous les profiles
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow h-full p-2 rounded-xl shadow-lg border overflow-auto">
        {children}
      </div>
    </div>
  );
}
