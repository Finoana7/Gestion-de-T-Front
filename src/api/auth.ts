import axios from 'axios'
import { api, token } from '../constant'

export type User = {
    id: string
    name: string
}

export type Auth = {
    name: string
    password: string
}

export async function login(data: Auth) {
    const res = await axios.post(`${api}/user/login`, data)
    return res.data
}

export async function signup(data: Auth) {
    const res = await axios.post(`${api}/user/register`, data)
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