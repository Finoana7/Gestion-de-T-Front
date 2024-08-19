import axios from "axios"
import { api as _, token } from "../constant"
const api = `${_}/message`

export type SendMessage = {
    text: string | null
    photo: string | null
}

export async function sendMessage(familyId: string, data: SendMessage) {
    const res = await axios.post(api, data, {
        headers: {
            Authorization: token()
        },
        params: {
            familyId
        }
    })
    return res.data
}