import axios from "axios";
import { api, token } from "../constant";

export async function depenser(data: {label: string, amount: number}) {
    const res = await axios.post(`${api}/trans`, data, {
        headers: {
            "Authorization": token()
        }
    })

    return res.data
}