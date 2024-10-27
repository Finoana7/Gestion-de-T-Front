import axios from 'axios'
import { api, token } from '../constant'

export type User = {
    Id: string
    Name: string
    Role: "admin" | "editeur" | "observateur"
}

export type Auth = {
    name: string
    password: string
}

export async function login(data: Auth) {
    const res = await axios.post(`${api}/user/login`, data)
    return res.data
}

export async function auth() {
    const res = await axios.get(`${api}/user/`, {
        headers: {
            "Authorization": token()
        }
    })
    return res.data
}