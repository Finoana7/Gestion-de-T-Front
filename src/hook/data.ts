import useFetch from "http-react"
import { api, token } from "../constant"

export function useSold() {
    const {data, reFetch} = useFetch<number>(`${api}/sold`, {
        headers: {
            "Authorization": token()
        }
    })

    return {data, reFetch}
}

export function useRecette() {
    const {data, reFetch} = useFetch<number>(`${api}/recette`, {
        headers: {
            "Authorization": token()
        }
    })

    return {data, reFetch}
}

export function useDepense() {
    const {data, reFetch} = useFetch<number>(`${api}/trans`, {
        headers: {
            "Authorization": token()
        }
    })

    return {data, reFetch}
}