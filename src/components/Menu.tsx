import { useEffect } from "react"
import init from "../utils/init"
import { Link } from "react-router-dom"

function Menu() {

    useEffect(init, [])

    return (
        <div className="left">
            <div className="sidebar">
                <Link to='/' className="flex items-center gap-4 menu-item active">
                    <span className="text-xl">🏚️</span>
                    <span className="font-semibold text-sm">Home</span>
                </Link>
                <Link to='/juma' className="flex items-center gap-4 menu-item">
                    <span className="text-xl">💐</span>
                    <span className="font-semibold text-sm">Juma</span>
                </Link>
                <Link to='/login' className="flex items-center gap-4 menu-item">
                    <span className="text-xl">🚪</span>
                    <span className="font-semibold text-sm">logout</span>
                </Link>
            </div>
        </div>
    )
}

export default Menu
