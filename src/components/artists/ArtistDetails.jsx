import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArtistsContext } from "./ArtistsProvider"
import { UserContext } from "../../views/UserProvider"
import { Bookings } from "../Bookings/Bookings"

export const ArtistDetails = () => {
    const [artist, setArtist] = useState({})

    const { id } = useParams()

    const { getArtistById } = useContext(ArtistsContext)

    const { currentUser } = useContext(UserContext)

    // const navigate = useNavigate()

    useEffect(() => {
        getArtistById(parseInt(id)).then(setArtist)
    }, [])

    return (
        <div className="flex flex-col items-center justify-start gap-5 p-10">
            <h1 className="text-[5rem] font-bold tracking-wider">
                {artist.name}
            </h1>
            <img
                className="shadow-dark w-[40rem] rounded-3xl shadow-md"
                src={artist.imageUrl}
                alt={artist.name}
            />
            <section className="flex flex-col items-center gap-2">
                <h2 className="text-2xl font-semibold">Contact:</h2>
                <p className="text-lg">{artist.email}</p>
            </section>
            {/* {currentUser === artist.id && (
                <button
                    onClick={() => navigate(`/artists/${artist.id}/edit`)}
                    className="shadow-dark bg-blue-grey hover:bg-light-blue text-dark hover:text-light h-[3rem] w-[10rem] cursor-pointer rounded-2xl font-bold tracking-wider shadow-sm hover:scale-105"
                >
                    Edit Profile
                </button>
            )} */}

            <Bookings />
        </div>
    )
}
