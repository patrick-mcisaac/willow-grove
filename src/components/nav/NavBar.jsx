import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../views/UserContext"

export const NavBar = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)

    return (
        <ul className="text-light flex h-[5rem] w-full items-center justify-around gap-[2rem] border-2 border-black bg-black px-5 md:justify-start">
            <li className="text-xl transition hover:scale-110">
                <Link to="/artists" className="font-bold tracking-wider">
                    Artists
                </Link>
            </li>

            {currentUser ?
                <>
                    <li className="text-xl transition hover:scale-110 md:ml-auto">
                        <Link
                            to={`/artists/${currentUser}`}
                            className="font-bold tracking-wider"
                        >
                            Profile
                        </Link>
                    </li>

                    <li className="text-xl transition hover:scale-110">
                        <Link
                            onClick={() => {
                                localStorage.removeItem("currentUserId")
                                setCurrentUser(null)
                            }}
                            to="/"
                            className="font-bold tracking-wider"
                        >
                            Logout
                        </Link>
                    </li>
                </>
            :   <>
                    <li className="text-xl transition hover:scale-110 md:ml-auto">
                        <Link to="/login" className="font-bold tracking-wider">
                            Login
                        </Link>
                    </li>
                    <li className="text-xl transition hover:scale-110">
                        <Link
                            to="/register"
                            className="font-bold tracking-wider"
                        >
                            Register
                        </Link>
                    </li>
                </>
            }
        </ul>
    )
}
