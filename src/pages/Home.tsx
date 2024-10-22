import Header from "../components/Header";
import Layout from "../components/Layout";

export default function Home() {

  return (
    <div className="flex flex-col w-full h-full bg-neutral-200">
      <Header/>
      <main className="border flex w-full h-full p-3">
        <Layout/>
      </main>
    </div>
  )
}
