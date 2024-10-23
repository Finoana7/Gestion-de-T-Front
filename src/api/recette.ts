import axios from "axios";
import { api, token } from "../constant";

export async function recetter(data: {label: string, amount: number}) {
    const res = await axios.post(`${api}/recette`, data, {
        headers: {
            "Authorization": token()
        }
    })

    return res.data
}

export async function historicRecette() {
    const res = await axios.get(`${api}/recette`, {
        headers: {
            "Authorization": token()
        }
    })

    return res.data
}