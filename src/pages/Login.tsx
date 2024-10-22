import { Link, useNavigate } from "react-router-dom"
import useLogout from "../hook/useLogout"
import { Auth, login } from "../api/auth"

function Login() {
    useLogout()
    const nav = useNavigate()

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const data: Auth = {
            name: String(form.get('name')).trim(),
            password: String(form.get('password')).trim()
        }

        await login(data)
        .then(({Token}: {Token: string}) => {
            localStorage.setItem('token', Token)
            nav('/')
        })
        .catch(() => alert('something wrong 😰'))
    }

    return (
        <div className="flex justify-center items-start w-full h-full pt-5 bg-slate-200 overflow-y-auto">
            <div className="flex flex-col items-center gap-12 w-[24rem] h-max p-5 bg-white border shadow-lg rounded-lg">
                <form onSubmit={submit} className="flex flex-col gap-4 w-full">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                        </span>
                        <input name='name' type="text" id="name" placeholder="ex: fabrich" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <div className="flex">
                        <input name='password' type="password" id="password" placeholder="..." className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>

                    <button type="submit" className="w-full h-max p-2 rounded-md bg-slate-700 text-white text-center">login</button>
                </form>

                <div className='text-sm'>Don't have an account ? <Link to="/register" className='text-slate-700'>register</Link></div>
            </div>
        </div>
    )
}

export default Login
