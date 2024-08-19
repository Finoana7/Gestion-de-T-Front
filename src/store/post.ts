import useFetch from "http-react";
import { api as _, token } from "../constant";
import { User } from "../api/auth";
const api = `${_}/post`

export type Reaction = {
    id: string
    type: 'like' | 'cool' | 'nocare'
    user: User
}

export type PostType = {
    id: string
    photo: string
    reaction: Reaction[]
    text: string
    updatedAt: string
    createdAt: string
    user: User
}

export function Posts() {
    return useFetch<PostType[]>(api, {
        headers: {
            "Authorization": token()
        }
    })
}

export function OnePost(id: string){
    return useFetch<PostType>(`${api}/one`, {
        headers: {
            "Authorization": token()
        },
        query: {
            id
        }
    })
}