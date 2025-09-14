import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../views/UserProvider"

export const NavBar = () => {
    // TODO: hamburger menu for mobile??

    const { currentUser, setCurrentUser } = useContext(UserContext)

    return (
        <ul className="text-light flex h-[5rem] w-full items-center justify-around gap-[2rem] border-2 border-black bg-black px-5 md:justify-start">
            {/* maybe not mvp for events page */}
            <li className="text-xl transition hover:scale-110">
                <Link to="/events" className="font-bold tracking-wider">
                    Events
                </Link>
            </li>
            <li className="text-xl transition hover:scale-110">
                <Link to="/artists" className="font-bold tracking-wider">
                    Artists
                </Link>
            </li>

            {currentUser ?
                <>
                    {/* 
                    NOT MVP
                    <li
                        to="/bookings"
                        className="text-xl transition hover:scale-110"
                    >
                        <Link
                            to={`/artists/${currentUser}/bookings`}
                            className="font-bold tracking-wider"
                        >
                            Bookings
                        </Link>
                    </li> */}

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
