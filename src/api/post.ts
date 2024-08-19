import axios from "axios"
import { api as _, token } from "../constant"
const api = `${_}/post`

export type CreatePost = {
    text: string | null
    photo: string | null
}

export type ReactType = {
    postId: string
    type: 'like' | 'cool' | 'cute' | string
}

export async function createPost(data: CreatePost) {
    const res = await axios.post(api, data, {
        headers: {
            Authorization: token()
        }
    })
    return res.data
}

export async function reactPost(data: ReactType) {
    const res = await axios.post(`${api}/react`, data, {
        headers: {
            Authorization: token()
        }
    })
    return res.data
}