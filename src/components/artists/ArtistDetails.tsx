import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useArtists } from "./ArtistsProvider.js"
import { Bookings } from "../Bookings/Bookings.js"
import type { Artist } from "@/types/ArtistTypes.js"
import { useUser } from "../../views/UserProvider.js"

export const ArtistDetails = () => {
    const [artist, setArtist] = useState<Artist | undefined>(undefined)

    const { id } = useParams()

    const { getArtistById, deleteArtist } = useArtists()

    const { currentUser, setCurrentUser } = useUser()

    const navigate = useNavigate()

    useEffect(() => {
        id && getArtistById(id).then(setArtist)
    }, [id])

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (id) {
            await deleteArtist(id)
            // logout
            localStorage.removeItem("currentUserId")
            setCurrentUser(undefined)
            navigate("/")
        }
    }

    return (
        <div className="flex flex-col items-center justify-start gap-5 p-10">
            <h1 className="text-center text-[2rem] font-bold tracking-wider md:text-[4rem] lg:text-[5rem]">
                {artist?.name}
            </h1>
            <section className="flex flex-col items-center gap-2">
                <h2 className="text-2xl font-semibold">Contact:</h2>
                <p className="text-lg">{artist?.email}</p>
            </section>
            <img
                className="shadow-dark w-[40rem] rounded-3xl shadow-md"
                src={artist?.imageUrl}
                alt={artist?.name}
            />

            <Bookings />
            {id && currentUser === parseInt(id) && (
                <button
                    onClick={handleDelete}
                    className="shadow-dark text-dark hover:text-light mt-[3rem] h-[2rem] w-[9rem] cursor-pointer rounded-2xl bg-red-400 font-semibold tracking-wider shadow-sm transition hover:scale-105 hover:bg-red-500 md:h-[3rem] md:w-[10rem] md:font-bold"
                >
                    Delete Profile
                </button>
            )}
        </div>
    )
}
