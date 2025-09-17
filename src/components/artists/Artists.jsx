import React, { useContext, useEffect } from "react"
import { ArtistsContext } from "./ArtistsProvider"
import { ArtistsList } from "./ArtistsList"

export const Artists = () => {
    const { artists, getArtists } = useContext(ArtistsContext)

    useEffect(() => {
        getArtists()
    }, [])
    return (
        <div className="flex flex-col items-center gap-[5rem] p-[5rem]">
            <h1 className="text-[5rem] font-bold tracking-wider">
                Our Artists
            </h1>
            <div className="flex flex-wrap items-center justify-around gap-[5rem_4rem]">
                {artists.map(a => (
                    <ArtistsList key={a.id} artist={a} />
                ))}
            </div>
        </div>
    )
}
