import { create } from 'zustand'
import { User } from '../api/auth'

export const user_store = create<{ data: User | null, update: (new_: any) => void}>(set => ({
    data: null,
    update(new_) {
        set((_prev) => ({ data: new_ }))
    }
}))