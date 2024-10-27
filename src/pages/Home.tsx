import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Historic from "./Historic";
import Depense from "./Depense";
import Recette from "./Recette";
import { Toaster } from "react-hot-toast";
import Profiles from "../components/Profiles";

export default function Home() {
  const { tab = "" } = useParams<{
    tab: "historic" | "depense" | "recette" | "profiles" | "";
  }>();

  return (
    <div className="flex flex-col w-full h-full bg-neutral-200">
      <Toaster />
      <Header />
      <main className="border flex w-full h-full p-3">
        <Layout>
          {
            tab !== "profiles" ?
            <nav className="flex gap-3 justify-between w-full">
              <div className="flex gap-3">
                <Link
                  to={"/historic"}
                  className={`px-4 py-2 flex items-center text-sm font-bold rounded-xl ${
                    tab === "historic" || tab === ""
                      ? "text-white bg-indigo-500"
                      : "bg-white/50 inset-0 backdrop-blur-sm border border-white"
                  }`}
                >
                  Historique
                </Link>
                <Link
                  to={"/depense"}
                  className={`px-4 py-2 flex items-center rounded-xl text-sm font-bold ${
                    tab === "depense"
                      ? "text-white bg-indigo-500"
                      : "bg-white/50 inset-0 backdrop-blur-sm border border-white"
                  }`}
                >
                  Depense
                </Link>
                <Link
                  to={"/recette"}
                  className={`px-4 py-2 flex items-center rounded-xl text-sm font-bold ${
                    tab === "recette"
                      ? "text-white bg-indigo-500"
                      : "bg-white/50 inset-0 backdrop-blur-sm border border-white"
                  }`}
                >
                  Recette
                </Link>
              </div>
              {/* <Link
                to={"/profiles"}
                className={`flex items-center w-8 h-8 p-2 rounded-full text-sm inset-0 backdrop-blur-sm border border-white ${
                  tab === "profiles" ? "text-indigo-500 bg-white" : "bg-white/30"
                }`}
              >
                <FaUsers className="w-full h-full"/>
              </Link> */}
            </nav>
            : null
          }
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
                case "profiles":
                  return <Profiles />;
                default:
                  return <></>;
              }
            })()}
          </div>
        </Layout>
      </main>
    </div>
  );
}
