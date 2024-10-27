import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Historic from "./Historic";
import Depense from "./Depense";
import Recette from "./Recette";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const { tab = "" } = useParams<{ tab: "historic" | "depense" | "recette" | "" }>();

  console.log(tab);
  

  return (
    <div className="flex flex-col w-full h-full bg-neutral-200">
      <Toaster />
      <Header />
      <main className="border flex w-full h-full p-3">
        <Layout>
          <nav className="flex gap-3">
            <Link
              to={"/historic"}
              className={`text-lg px-4 py-2 rounded-xl ${
                tab === "historic" || tab === "" ? "text-white bg-indigo-500" : "bg-white"
              }`}
            >
              Historique
            </Link>
            <Link
              to={"/depense"}
              className={`text-lg px-4 py-2 rounded-xl ${
                tab === "depense" ? "text-white bg-indigo-500" : "bg-white"
              }`}
            >
              Depense
            </Link>
            <Link
              to={"/recette"}
              className={`text-lg px-4 py-2 rounded-xl ${
                tab === "recette" ? "text-white bg-indigo-500" : "bg-white"
              }`}
            >
              Recette
            </Link>
          </nav>
          <div className="w-full h-max">
            {(() => {
              switch (tab) {
                case "historic":
                  return <Historic />;
                case "depense":
                  return <Depense />;
                case "recette":
                  return <Recette />;
                case "":
                  return <Historic />;
                default:
                  return <></>
              }
            })()}
          </div>
        </Layout>
      </main>
    </div>
  );
}
