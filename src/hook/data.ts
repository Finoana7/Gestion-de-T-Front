import useFetch from "http-react"
import { api, token } from "../constant"
import { Recette } from "../types/recette"
import { User } from "../api/auth"

export function useSold() {
    const {data, reFetch} = useFetch<number>(`${api}/sold`, {
        headers: {
            "Authorization": token()
        }
    })

    return {data, reFetch}
}

export function useRecette() {
    const {data, reFetch} = useFetch<Recette[]>(`${api}/recette`, {
        headers: {
            "Authorization": token()
        }
    })

    return {data, reFetch}
}

export function useDepense() {
    const {data, reFetch} = useFetch<Recette[]>(`${api}/depense`, {
        headers: {
            "Authorization": token()
        }
    })

    return {data, reFetch}
}

export function useProfiles(){
    const {data, reFetch} = useFetch<User[]>(`${api}/user/all`, {
        headers: {
            "Authorization": token()
        }
    })

    return {data, reFetch}
}