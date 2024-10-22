import { user_store } from '../store/user'

export default function Home() {
    const {data: user} = user_store()
  return (
    <h1>
      {JSON.stringify(user)}
    </h1>
  )
}
