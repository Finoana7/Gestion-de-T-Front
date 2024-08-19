import { Button, Input } from "@mui/joy";
import { Families } from "../store/family"
import { user_store } from "../store/user";
import { requestFamily } from "../api/family";
import { useMemo } from "react";
import {motion} from "framer-motion"

function Juma() {

    const me = user_store(u => u.data)

    const { data, mutate, refresh } = Families()

    const families = useMemo(() => data, [data])

    const request = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)

        const familyId = e.currentTarget.name
        const about = form.get('about')!
        await requestFamily(familyId, String(about))
            .then(() => {
                mutate(prev => prev?.filter(fm => fm.id !== familyId))
            })
            .catch(() => alert('something wrong !'))
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const query = String(form.get('query')).trim()

        mutate(prev => prev?.filter(fm => (fm.name.includes(query))))
    }

    return (
        <>
            <div className="middle flex flex-col gap-5 h-screen">
                <h1 className="text-2xl font-bold">Connecting familia</h1>
                <form onSubmit={handleSearch} className="flex justify-between gap-3 w-full">
                    <div className="flex items-center gap-4 w-full">
                        <div>Search :</div>
                        <Input name="query" className="w-[50%]" required />
                        <button type="submit">🔎</button>
                    </div>
                    <motion.button onClick={refresh} type="reset" whileTap={{rotate: 360}} className="text-xl saturate-200">💿</motion.button>
                </form>

                <div className="flex flex-col gap-16">
                    {
                        families?.map(fm => (
                            <div className="relative flex flex-col gap-4 feed bg-white p-4 rounded-lg" key={fm.id}>
                                <div className="user flex items-center">
                                    <div className="profile-pic">
                                        <img src={fm.photo} alt="" />
                                    </div>
                                    <div className="info">
                                        <h3 className="font-bold text-[1.03rem]">{fm.name}</h3>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-full h-max">
                                    <img src={fm.photo} alt="" className="w-full h-auto rounded-lg shadow-lg" />
                                </div>
                                <div className="">
                                    <div className="text-sm font-mono"><strong>{fm.members.length}</strong> {"member(s)"}</div>
                                </div>
                                {!fm.familyRequest.find(fr => fr.user.id === me?.id) && !fm.members.find(m => m.id === me?.id) ?
                                    <form name={fm.id} onSubmit={request} className="flex gap-2 w-full">
                                        <input name="about" type="text" className="text-sm p-0 border-none outline-none bg-transparent w-full" placeholder="Write a message for them" required />
                                        <Button type="submit" variant="soft" className="text-nowrap text-sm">Send request</Button>
                                    </form> : null}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="flex flex-col gap-14 right">
                {
                    families?.map(fm => (
                        <div className="flex flex-col gap-2 w-full h-max" key={fm.id}>
                            <div className="">{fm.name}</div>
                            <div className="w-full h-max max-h-56 overflow-hidden shadow-lg rounded-lg">
                                <img src={fm.photo} alt="" className="w-full h-auto" />
                            </div>
                            {!fm.familyRequest.find(fr => fr.user.id === me?.id) && !fm.members.find(m => m.id === me?.id) ?
                                <form name={fm.id} onSubmit={request} className="flex gap-2 w-full">
                                    <input name="about" type="text" className="text-sm p-0 border-none outline-none bg-transparent w-full" placeholder="Write a message for them" required />
                                    <Button type="submit" variant="soft" className="text-nowrap text-sm">Send request</Button>
                                </form> : null}
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Juma
