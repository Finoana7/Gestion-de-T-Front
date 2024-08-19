import axios from 'axios'
import { api as _, token } from '../constant'
import { FamilyFull } from '../store/family'
const api = _ + '/user'

export type FamilyLite = {
    id: string
    name: string
    photo: string
}

export type User = {
    id: string
    name: string
    photo: string | null
    family: FamilyFull[]
}

export type Auth = {
    name: string
    password: string
}

export async function login(data: Auth) {
    const res = await axios.post(`${api}/login`, data)
    return res.data
}

export async function signup(data: Auth) {
    const res = await axios.post(`${api}/signup`, data)
    return res.data
}

export async function auth() {
    const res = await axios.get(`${api}`, {
        headers: {
            "Authorization": token()
        }
    })
    return res.data
}