import React from "react"
import { Link } from "react-router-dom"

export const NavBar = () => {
    // TODO:  make bookings, profile, login/logout dynamic if signed in
    // TODO: hamburger menu for mobile??
    return (
        <ul className="text-light flex h-[5rem] w-full items-center justify-around gap-[2rem] border-2 border-black bg-black px-5 md:justify-start">
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
            <li to="/bookings" className="text-xl transition hover:scale-110">
                <Link to="/" className="font-bold tracking-wider">
                    Bookings
                </Link>
            </li>

            <li className="text-xl transition hover:scale-110 md:ml-auto">
                <Link to="/" className="font-bold tracking-wider">
                    Profile
                </Link>
            </li>

            <li className="text-xl transition hover:scale-110">
                <Link to="/" className="font-bold tracking-wider">
                    Logout
                </Link>
            </li>
            {/*   <li className="md:ml-auto text-xl transition hover:scale-110">
                <Link to="/login" className="font-bold tracking-wider">
                    Login
                </Link>
            </li> */}
        </ul>
    )
}
