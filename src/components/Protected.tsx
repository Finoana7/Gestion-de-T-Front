import { PropsWithChildren, useEffect } from "react"
import { auth } from "../api/auth"
import { user_store } from "../store/user"
import { useNavigate } from "react-router-dom"

function Protected({ children }: PropsWithChildren) {

    const nav = useNavigate()
    const user = user_store()

    useEffect(() => {
        auth()
            .then((res) => {
                user.update(res)
            })
            .catch(() => nav('/login'))
    }, [])

    return (
        <>{user.data ? children : null}</>
    )
}

export default Protected