import React from "react";
import { useSold } from "../hook/data";

type Props = React.PropsWithChildren;

export default function Layout({ children }: Props) {
  const sold = useSold();

  return (
    <div className="flex justify-between w-full h-full">
      <div className="flex flex-col items-center gap-3 w-[17rem] h-max p-5 rounded-xl shadow-lg border bg-white">
        <h1 className="font-bold italic text-2xl underline">Solde</h1>
        <div className="text-2xl font-mono">{JSON.stringify(sold)} Ar</div>
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
