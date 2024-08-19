import { Link, useNavigate, useParams } from "react-router-dom"
import { MyFamily } from "../store/family"
import { user_store } from "../store/user"
import { PiCloverFill } from "react-icons/pi"
import useQuery from "../hook/useQuery"
import { Button, Input } from "@mui/joy"
import React, { useEffect, useState } from "react"
import { User } from "../api/auth"
import { search } from "../api/user"
import { inviteUser } from "../api/family"
import { uploadImage } from "../api/image"
import { sendMessage } from "../api/message"
import { Message, OurMessage } from "../store/message"
import ItemMessage from "../components/ItemMessage"
import { socket } from "../utils/socket.io"
import Request from "../components/Request"

function Family() {

    const { id } = useParams()
    if (!id) return

    const nav = useNavigate()

    const me = user_store(u => u.data)
    const { data: family, reFetch } = MyFamily(id)

    const invite = Boolean(useQuery('invite'))
    const [result, setRs] = useState<User[] | null>()

    const [image, setIm] = useState<File | null>()

    const { data } = OurMessage(id)

    const [messages, mutate] = useState<Message[]>(data)

    useEffect(() => {
        mutate(data)
    }, [data])

    const searching = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const query = String(form.get('query'));

        (e.target as EventTarget & HTMLFormElement).reset()

        await search(query)
            .then((res) => {
                setRs(res)
            })
    }

    const inviting = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setRs(null)

        const form = new FormData(e.currentTarget)
        const about = String(form.get('about'))

        await inviteUser(id, e.currentTarget.name, about)
            .finally(() => nav(''))
    }

    const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const file = e.currentTarget.files?.item(0)
        setIm(file)
    }

    const send = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget!)

        const text = form.get('text')
        let photo = null

        if (!text && !image) return

        if (image) {
            photo = await uploadImage(image)
        }

        setIm(null);
        (e.target as EventTarget & HTMLFormElement).reset()

        await sendMessage(id, {
            text: text ? String(text) : null,
            photo
        })
            .catch(() => alert('something wrong'))
    }

    const receive = (received: Message) => {
        if (received.family.id === id) {
            mutate(prev => {
                console.log(prev);

                return [...prev, received]
            })
        }
    }

    useEffect(() => {
        socket.connect();
        socket.on('message', receive);
        return () => {
            socket.off('message', receive);
            socket.disconnect();
        };
    }, []);

    return (
        <>
            <div className="middle flex flex-col gap-5 h-screen">
                <h1 className="text-xl font-bold">
                    {
                        invite ?
                            <>
                                <Link to='' className="mr-3">👈</Link>
                                Invite to {family?.name}
                            </>
                            :
                            family?.name
                    }
                </h1>

                <div className="flex flex-col gap-2 w-full h-full">
                    {
                        !invite ?
                            <>
                                <div className="flex justify-start gap-5 w-full h-max overflow-x-auto overflow-y-hidden">
                                    <Link to='?invite=true' className="flex flex-col items-center">
                                        <div className="flex justify-center items-center w-10 h-10 rounded-full bg-white">
                                            <PiCloverFill className="text-indigo-800" />
                                        </div>
                                        <div className=" text-sm">invite</div>
                                    </Link>
                                    {
                                        family?.members?.map(user => (
                                            <div key={user.id} className="flex flex-col items-center">
                                                <img src={user.photo || "/nest.jpg"} alt="" className="w-10 h-10 rounded-full" />
                                                <div className="font-mono text-sm">{me?.id === user.id ? 'You' : user.name}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="flex flex-col gap-3 justify-between h-[65%] pt-5">
                                    <div className=" w-full h-full overflow-auto">
                                        <div className="flex flex-col gap-5 justify-end w-full h-max">
                                            {
                                                messages?.map(message => <ItemMessage key={message.id} message={message} />)
                                            }
                                        </div>
                                    </div>

                                    <form onSubmit={send} className="flex items-center gap-4 w-full h-max">
                                        <input name='text' type="text" className="w-full rounded-2xl py-1 px-3" placeholder="🪶 Write here ..." />
                                        <div className="flex gap-3 w-max">
                                            <input onChange={changeImage} id="fileMs" type="file" accept="image/*" hidden />
                                            <label htmlFor="fileMs" className="flex items-center cursor-pointer">🖼️</label>
                                            <button type="submit" className="text-lg ml-2 cursor-pointer border">🚀</button>
                                        </div>
                                    </form>
                                </div>
                            </>
                            :
                            <div className="flex flex-col gap-7 w-full h-full">
                                <form onSubmit={searching} action="search" className="flex gap-2">
                                    <Input name="query" placeholder="Search here" required />
                                    <button>🔎</button>
                                </form>
                                <div className="flex flex-col gap-5 w-full h-max">
                                    {
                                        result?.map(u => (
                                            (u.id !== me?.id && !family?.members.find(m => m.id === u.id)) ?
                                                <form name={u.id} onSubmit={inviting} key={u.id} className="flex gap-3 justify-between items-end px-2 py-3">
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex items-center gap-3">
                                                            <img src={u.photo || '/nest.jpg'} alt="" className="w-8 h-8 rounded-full" />
                                                            <div className="font-mono">{u.name}</div>
                                                        </div>
                                                        <input name="about" type="text" className="text-sm p-0 border-none outline-none bg-transparent" placeholder="Write a message for him" required />
                                                    </div>
                                                    <Button type="submit" variant="soft" className="h-max">invite</Button>
                                                </form>
                                                : null
                                        ))
                                    }
                                </div>
                            </div>
                    }
                </div>
            </div>
            <div className="right">
                <div className="w-full h-max">
                    <div className="w-full h-max max-h-56 overflow-hidden shadow-lg rounded-lg">
                        <img src={family?.photo} alt="" className="w-full h-auto" />
                    </div>
                </div>
                <Request id={id} reFetch={reFetch} />
            </div>
        </>
    )
}

export default Family
