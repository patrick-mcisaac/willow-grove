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
            className="bg-light shadow-dark flex w-[25rem] cursor-pointer flex-col items-center gap-3 overflow-hidden rounded-2xl shadow-2xl transition hover:scale-105 md:w-[20rem] lg:w-[25rem]"
        >
            <img className="w-full" src={artist.imageUrl} alt={artist.name} />
            <h2 className="mb-2.5 text-center text-[1.6rem] font-semibold md:text-[1.8rem] lg:text-[2rem]">
                {artist.name}
            </h2>
        </section>
    )
}
