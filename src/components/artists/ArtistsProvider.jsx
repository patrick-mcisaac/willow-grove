import { createContext, useState } from "react"

export const ArtistsContext = createContext()

export const ArtistsProvider = ({ children }) => {
    const [artists, setArtists] = useState([])

    const getArtists = () => {
        fetch(`http://localhost:8088/users`)
            .then(res => res.json())
            .then(setArtists)
    }

    const getArtistById = id => {
        return fetch(`http://localhost:8088/users/${id}`).then(res =>
            res.json()
        )
    }

    return (
        <ArtistsContext.Provider value={{ artists, getArtists, getArtistById }}>
            {children}
        </ArtistsContext.Provider>
    )
}
