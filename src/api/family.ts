import axios from "axios"
import { api as _, token } from "../constant"

const api = `${_}/family`

export type CreateFamily = {
    name: string
    photo: string
}

export async function createFamily(data: CreateFamily) {
    const res = await axios.post(`${api}/create`, data, {
        headers: {
            Authorization: token()
        }
    })
    return res.data
}

export async function updateHead(familyId: string, newHeadId: string) {
    const res = await axios.put(`${api}/head`, null, {
        headers: {
            Authorization: token()
        },
        params: {
            familyId, newHeadId
        }
    })
    return res.data
}

export async function requestFamily(familyId: string, about: string) {
    const res = await axios.post(`${api}/request`, { about }, {
        headers: {
            Authorization: token()
        },
        params: {
            familyId
        }
    })
    return res.data
}

export async function acceptFamily(familyId: string, id: string) {
    const res = await axios.put(`${api}/accept`, null, {
        headers: {
            Authorization: token()
        },
        params: {
            id, familyId
        }
    })
    return res.data
}

export async function declineFm(familyId: string, id: string) {
    const res = await axios.delete(`${api}/decline`, {
        headers: {
            Authorization: token()
        },
        params: {
            id, familyId
        }
    })
    return res.data
}

export async function inviteUser(familyId: string, userId: string, about: string) {
    const res = await axios.post(`${api}/invite`, {about}, {
        headers: {
            Authorization: token()
        },
        params: {
            userId, familyId
        }
    })
    return res.data
}

export async function request(familyId: string, about: string) {
    const res = await axios.post(`${api}/request`, {about}, {
        headers: {
            Authorization: token()
        },
        params: {
            familyId
        }
    })
    return res.data
}