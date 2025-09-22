import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Bookings } from "../Bookings/Bookings"
import { ArtistsContext } from "./ArtistContext"

export const ArtistDetails = () => {
    const [artist, setArtist] = useState({})

    const { id } = useParams()

    const { getArtistById } = useContext(ArtistsContext)

    useEffect(() => {
        getArtistById(id).then(setArtist)
    }, [id])

    return (
        <div className="flex flex-col items-center justify-start gap-5 p-10">
            <h1 className="text-center text-[2rem] font-bold tracking-wider md:text-[4rem] lg:text-[5rem]">
                {artist.name}
            </h1>
            <section className="flex flex-col items-center gap-2">
                <h2 className="text-2xl font-semibold">Contact:</h2>
                <p className="text-lg">{artist.email}</p>
            </section>
            <img
                className="shadow-dark w-[40rem] rounded-3xl shadow-md"
                src={artist.imageUrl}
                alt={artist.name}
            />

            <Bookings />
            {/* TODO: add delete profile button */}
        </div>
    )
}
