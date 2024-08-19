import useFetch from 'http-react'
import { api as _, token } from '../constant'
import { FamilyLite, User } from '../api/auth'
import { Message } from './message'
const api = `${_}/family`

export type FamilyFull = {
    id: string
    name: string
    photo: string
    members: User[]
    message: Message[]
    familyRequest: RequestType[]
    createdAt: string
    updatedAt: string
}

export function MyFamily(familyId: string) {
    return useFetch<FamilyFull>(`${api}`, {
        headers: {
            "Authorization": token()
        },
        query: {
            familyId
        }
    })
}

export function Families() {
    return useFetch<FamilyFull[]>(`${api}/all`, {
        headers: {
            "Authorization": token()
        }
    })
}

export type RequestType = {
    id: string
    about: string
    userId: string
    familyId: string
    user: User
}

export function TheirRequest(familyId: string) {
    return useFetch<RequestType[]>(`${api}/request`, {
        refresh: '60 sec',
        headers: {
            "Authorization": token()
        },
        query: {
            familyId
        }
    })
}

export type InviteType = {
    id: string
    about: string
    family: FamilyLite
}

export function MyInviation() {
    return useFetch<InviteType[]>(`${api}/invite`, {
        refresh: '60 sec',
        headers: {
            "Authorization": token()
        }
    })
}