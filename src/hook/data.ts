import useFetch from "http-react"
import { api, token } from "../constant"

export function useSold() {
    const {data} = useFetch<number>(`${api}/sold`, {
        headers: {
            "Authorization": token()
        }
    })
    return data
}