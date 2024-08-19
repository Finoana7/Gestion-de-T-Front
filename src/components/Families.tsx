import { Link } from "react-router-dom";
import { user_store } from "../store/user"
import { PiPlusCircleFill } from "react-icons/pi";
import useQuery from "../hook/useQuery";
import NewFamily from "./NewFamily";

function Families() {

    const me = user_store(u => u.data)
    const create = useQuery<'family' | null>('create')

    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-xl font-bold">Your Families</h1>
            <div className="stories">
                {
                    create !== 'family' ?
                    <>
                        <Link to='?create=family' className="story-blank flex flex-col items-center justify-center gap-4 bg-white border">
                            <div>
                                <PiPlusCircleFill className="w-10 h-10" />
                            </div>
                            <div className="">new family</div>
                        </Link>
                        {
                            me?.family?.map(f => (
                                <Link to={`/family/${f.id}`} className="story bg-no-repeat bg-cover" key={f.id} style={{ backgroundImage: `url("${f.photo}")` }}>
                                    <div className="profile-pic">
                                        <img src={f.photo} alt="" />
                                    </div>
                                    <p className="name">{f.name}</p>
                                </Link>
                            ))
                        }
                    </>
                    : <NewFamily/>
                }
            </div>
        </div>
    )
}

export default Families
