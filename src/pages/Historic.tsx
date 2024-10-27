import { useDepense, useRecette } from "../hook/data";
import sortByDate from "../utils/sortByDate";

function Historic() {
  const { data: recette } = useRecette();
  const { data: depense } = useDepense();

  const archive = sortByDate(recette?.concat(depense));

  return (
    <div className="w-full h-max mt-5">
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
          {archive?.map((arch) => (
            <div key={arch?.Id} className="flex gap-1 w-full min-w-[20rem]">
              <div className="text-center border w-[30%] p-2 overflow-auto text-nowrap rounded-lg transition-all bg-white">
                {arch?.amount} ar
              </div>
              <div className="text-center border w-[40%] p-2 overflow-auto text-nowrap rounded-lg transition-all bg-white">
                {arch?.label}
              </div>
              <div className="text-center border w-[30%] p-2 overflow-auto text-nowrap rounded-lg transition-all bg-white">
                {arch?.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Historic;
