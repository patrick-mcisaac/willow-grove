import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ArtistsContext } from "./ArtistsProvider"

export const ArtistDetails = () => {
    const [artist, setArtist] = useState({})

    const { id } = useParams()

    const { getArtistById } = useContext(ArtistsContext)

    useEffect(() => {
        getArtistById(parseInt(id)).then(setArtist)
    }, [])

    return (
        <div className="flex flex-col items-center justify-start gap-5 p-10">
            <h1 className="text-[5rem] font-bold tracking-wider">
                {artist.name}
            </h1>
            <img
                className="w-[40rem] rounded-3xl shadow-2xl"
                src={artist.imageUrl}
                alt={artist.name}
            />
            <section className="flex flex-col items-center gap-2">
                <h2 className="text-2xl font-semibold">Contact:</h2>
                <p className="text-lg">{artist.email}</p>
            </section>
        </div>
    )
}
