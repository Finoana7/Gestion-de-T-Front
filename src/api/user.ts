import axios from "axios";
import { api, token } from "../constant";
import { User } from "./auth";

export async function search(query: string) {
    const res = await axios.get<User[]>(`${api}/user/search`, {
        headers: {
            "Authorization": token()
        },
        params: {
            query
        }
    })
    return res.data
}