import { create } from 'zustand'
import { User } from '../api/auth'

export const user_store = create<{ data: User | null, update: (new_: any) => void, addFamily: (new_: any) => void }>(set => ({
    data: null,
    update(new_) {
        set((_prev) => ({ data: new_ }))
    },
    addFamily(new_) {
        set((_prev) => ({ data: { ..._prev.data!, family: [new_, ..._prev.data!.family] } }))
    },
}))