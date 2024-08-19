import { Button, Input } from "@mui/joy"
import { useState } from "react"
import { user_store } from "../store/user"
import { AiOutlineClose } from "react-icons/ai"
import { uploadImage } from "../api/image"
import { createFamily } from "../api/family"
import { useNavigate } from "react-router-dom"

function NewFamily() {

    const {data: me, addFamily} = user_store()
    const [image, setIm] = useState<File | null>()
    const nav = useNavigate()

    const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const file = e.currentTarget.files?.item(0)
        setIm(file)
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget!)

        const name = form.get('name')
        let photo = '/prisma.png'

        if (!name && !image) return

        if (image) {
            photo = await uploadImage(image)
        }

        setIm(null);
        (e.target as EventTarget & HTMLFormElement).reset()

        await createFamily({
            name: String(name),
            photo
        })
        .then((res) => {
            nav('/')
            addFamily(res)
        })
        .catch(() => alert('something wrong'))
    }

    return (
        <div className="flex gap-4 w-full">
            <form onSubmit={submit} className="flex flex-col justify-between w-[50%] h-full bg-white rounded-lg p-4">
                <Input name="name" defaultValue={`${me?.name}'family${String(Math.random()).split('').reverse().join('').slice(0, 4)}`} placeholder="Your family name" required />
                <label htmlFor="fileFm" className="text-center w-full text-sky-800 text-sm font-bold cursor-pointer">
                    photo <span className="ml-2 text-lg">📸</span>
                </label>
                <input onChange={changeImage} id="fileFm" name="fileFm" type="file" accept="image/*" hidden />
                <Button type="submit" variant="soft" className="w-full">create <span className="ml-2">🚀</span></Button>
            </form >
            <div className="relative w-[50%] bg-center bg-cover grad rounded-xl overflow-hidden" style={{ backgroundImage: image ? `url(${URL.createObjectURL(image)})` : '' }}>
                {image ? <button onClick={() => setIm(null)} className="absolute right-3 top-3 w-max h-max p-2 border bg-black/70 rounded-full z-50">
                    <AiOutlineClose className="text-lg text-white" />
                </button> : null}
            </div>
        </div >
    )
}

export default NewFamily
