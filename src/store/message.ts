import useFetch from "http-react";
import { api as _, token } from "../constant";
import { FamilyLite, User } from "../api/auth";
const api = `${_}/message`

export type Message = {
    id: string
    text: string | null
    photo: string | null
    user: User
    family: FamilyLite
    createdAt: string
    updatedAt: string
  }

export function OurMessage(familyId: string) {
    return useFetch<Message[]>(api, {
        headers: {
            "Authorization": token()
        },
        query: {
            familyId
        }
    })
}