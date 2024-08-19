import Families from "../components/Families";
import Header from "../components/Header";
import Menu from "../components/Menu";
import FormPost from "../components/FormPost";
import ListPost from "../components/ListPost";
import { Link, Route, Routes } from "react-router-dom";
import Family from "./Family";
import Invitation from "../components/Invitation";
import Message from "../components/Message";
import Juma from "./Juma";

function Home() {

    return (
        <div className="w-full h-full">
            <Header />

            <main className="main max-[992px]:pb-16">
                <div className="container">
                    <Menu />
                    <Routes>
                        <Route path="/family/:id" element={<Family />} />
                        <Route path="/juma" element={<Juma />} />
                        <Route index Component={() => {
                            return (
                                <>
                                    <div className="middle">
                                        <Families />
                                        <FormPost />
                                        <ListPost />
                                    </div>

                                    <div className="right">
                                        <Invitation />
                                        <Message />
                                    </div>
                                </>
                            )
                        }} />
                    </Routes>
                </div>
            </main>

            <div className="fixed max-[992px]:flex hidden bottom-0 w-full py-4 bg-white">
                <div className="flex justify-around w-full">
                    <Link to='/' className="menu-item active">
                        <span className="text-2xl">🏚️</span>
                    </Link>
                    <Link to='/juma' className="">
                        <span className="text-2xl">💐</span>
                    </Link>
                    <Link to='/login' className="">
                        <span className="text-2xl">🚪</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home