import React, { useContext, useEffect } from "react"
import { ArtistsContext } from "./ArtistsProvider.js"
import { ArtistsList } from "./ArtistsList.js"

export const Artists = () => {
    const { artists, getArtists } = useContext(ArtistsContext)

    useEffect(() => {
        getArtists()
    }, [])
    return (
        <div className="flex flex-col items-center gap-[3rem] p-10">
            <h1 className="text-[5rem] font-bold tracking-wider">
                Our Artists
            </h1>
            <div className="flex flex-wrap items-center justify-around gap-y-[5rem]">
                {artists.map(a => (
                    <ArtistsList key={a.id} artist={a} />
                ))}
            </div>
        </div>
    )
}
