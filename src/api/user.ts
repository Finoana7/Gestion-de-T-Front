import axios from "axios";
import { api, token } from "../constant";

export async function createUser(data: {name: string, role: string, password: string}) {
    const res = await axios.post(`${api}/user/register`, data, {
        headers: {
            "Authorization": token()
        }
    })

    return res.data
}