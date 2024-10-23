import toast from "react-hot-toast";
import { recetter } from "../api/recette";
import { useSold } from "../hook/data";

function Recette() {
  const { reFetch } = useSold();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const data = {
      amount: Number(form.get("amount")),
      label: String(form.get("label")).trim(),
    };

    await recetter(data)
      .then(() => {
        reFetch();
        toast.success("Success 💸");
      })
      .catch((err) => {
        toast.error(err.response.data)
      })
      .finally(() => {
        (e.target as EventTarget & HTMLFormElement).reset();
      });
  };

  return (
    <div className="flex flex-col gap-3 w-full h-max mt-3">
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
    </div>
  );
}

export default Recette;
