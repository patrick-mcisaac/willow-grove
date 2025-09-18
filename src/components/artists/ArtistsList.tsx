import type { Artist } from "@/types/ArtistTypes"
import React from "react"
import { useNavigate } from "react-router-dom"

interface Props {
    artist: Artist
}

export const ArtistsList = ({ artist }: Props) => {
    const navigate = useNavigate()

    return (
        <section
            onClick={() => navigate(`/artists/${artist.id}`)}
            className="bg-light shadow-dark flex w-[25rem] cursor-pointer flex-col items-center gap-3 overflow-hidden rounded-2xl shadow-2xl transition hover:scale-105"
        >
            <img className="w-full" src={artist.imageUrl} alt={artist.name} />
            <h2 className="mb-2.5 text-[2rem] font-semibold">{artist.name}</h2>
        </section>
    )
}
