import React from "react";
import { depenser } from "../api/depense";
import toast from "react-hot-toast";
import { useDepense, useSold } from "../hook/data";
import { user_store } from "../store/user";

function Depense() {
  const { data: depense, reFetch: reFetchDepense } = useDepense();
  const { reFetch } = useSold();
  const { data: user } = user_store();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const data = {
      amount: Number(form.get("amount")),
      label: String(form.get("label")),
    };

    await depenser(data)
      .then(() => {
        reFetch();
        reFetchDepense();
        toast.success("Success 💸");
      })
      .catch((err) => {
        toast.error(err.response?.data);
      })
      .finally(() => {
        (e.target as EventTarget & HTMLFormElement).reset();
      });
  };

  return (
    <div className="flex flex-col gap-3 w-full h-max mt-3">
      {
        user?.Role !== "observateur" ?
        <form
          onSubmit={submit}
          action=""
          className="flex flex-col justify-between gap-5 px-3 py-5 w-full bg-white rounded"
        >
          <div className="flex justify-between gap-5 w-full">
            <input
              type="number"
              name="amount"
              className="w-[60%] outline-none rounded"
              placeholder="Amount Ar"
              required
            />
            <input
              type="text"
              name="label"
              className="w-full outline-none rounded"
              placeholder="Libelé"
              required
            />
          </div>
          <button className="w-max font-bold text-indigo-600 bg-white px-4 py-2 rounded-xl border shadow">
            Submit
          </button>
        </form>
        : null
      }
      <div className="w-full h-max overflow-x-auto">
        <div className="flex flex-col gap-1 w-full h-max overflow-auto">
          <div className="flex gap-1 w-full min-w-[20rem]">
            <div className="text-center w-[30%] p-2 text-white bg-green-400 rounded">
              Amount
            </div>
            <div className="text-center w-[40%] p-2 text-white bg-green-400 rounded">
              Libelé
            </div>
            <div className="text-center w-[30%] p-2 text-white bg-green-400 rounded">
              Date
            </div>
          </div>
          {depense?.map((arch) => (
            <div key={arch.Id} className="flex gap-1 w-full min-w-[20rem]">
              <div className="text-center border w-[30%] p-2 overflow-auto text-nowrap rounded-lg transition-all bg-white">
                {arch.amount} ar
              </div>
              <div className="text-center border w-[40%] p-2 overflow-auto text-nowrap rounded-lg transition-all bg-white">
                {arch.label}
              </div>
              <div className="text-center border w-[30%] p-2 overflow-auto text-nowrap rounded-lg transition-all bg-white">
                {arch.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Depense;
