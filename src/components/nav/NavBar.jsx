import React from "react"
import { Link } from "react-router-dom"

export const NavBar = () => {
    return (
        <ul className="text-light flex h-20 w-full items-center justify-between border-2 border-black bg-black">
            <div className="ml-[3rem] flex items-center justify-start gap-[5rem]">
                <li className="text-xl transition hover:scale-110">
                    <Link className="font-bold tracking-wider">Events</Link>
                </li>
                <li className="text-xl transition hover:scale-110">
                    <Link className="font-bold tracking-wider">Artists</Link>
                </li>
            </div>
            <div className="mr-[3rem] flex items-center justify-end gap-[5rem]">
                <li className="text-xl transition hover:scale-110">
                    <Link className="font-bold tracking-wider">Profile</Link>
                </li>
                <li className="text-xl transition hover:scale-110">
                    <Link className="font-bold tracking-wider">Logout</Link>
                </li>
            </div>
        </ul>
    )
}
