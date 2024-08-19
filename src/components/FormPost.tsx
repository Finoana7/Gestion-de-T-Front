import { PiImageBrokenFill } from "react-icons/pi"
import { AiOutlineClose } from "react-icons/ai"
import { user_store } from "../store/user"
import React, { useState } from "react"
import { createPost } from "../api/post"
import { uploadImage } from "../api/image"

function FormPost() {

    const me = user_store(u => u.data)
    const [image, setIm] = useState<File | null>()

    const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const file = e.currentTarget.files?.item(0)
        setIm(file)
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
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

        await createPost({
            text: text ? String(text) : null,
            photo
        }).catch(() => alert('something wrong'))
    }

    return (
        <>
            <form onSubmit={submit} className="create-post">
                <div className="profile-pic">
                    <img src={me?.photo || '/nest.jpg'} alt="" />
                </div>
                <input
                    name="text"
                    type="text"
                    placeholder={`What's on your mind ${me?.name}?`}
                    className="border-none outline-none"
                />
                <div className="flex gap-2">
                    <div>
                        <label htmlFor="filepost" className="flex justify-center items-center cursor-pointer h-full">
                            <PiImageBrokenFill className="text-2xl" />
                        </label>
                        <input onChange={changeImage} type="file" name="" id="filepost" accept="image/*" hidden />
                    </div>
                    <button type="submit" className="btn btn-primary">Post</button>
                </div>
            </form>
            {
                image ?
                    <div className="relative w-full h-max">
                        <button onClick={() => setIm(null)} className="absolute right-3 top-3 w-max h-max p-2 border bg-black/70 rounded-full z-50">
                            <AiOutlineClose className="text-xl text-white" />
                        </button>
                        <img src={URL.createObjectURL(image!)} alt="" className="w-full h-auto border-2 mt-2 bg-white" />
                    </div>
                    : null}
        </>
    )
}

export default FormPost
