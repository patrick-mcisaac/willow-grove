import React, { useEffect } from "react"
import { useArtists } from "./ArtistsProvider.js"
import { ArtistsList } from "./ArtistsList.js"

export const Artists = () => {
    const { artists, getArtists } = useArtists()

    useEffect(() => {
        getArtists()
    }, [])
    return (
        <div className="flex flex-col items-center gap-[5rem] p-[5rem]">
            <h1 className="text-[5rem] font-bold tracking-wider">
                Our Artists
            </h1>
            <div className="flex flex-wrap items-center justify-around gap-[5rem_4rem]">
                {artists?.map(a => (
                    <ArtistsList key={a.id} artist={a} />
                ))}
            </div>
        </div>
    )
}
