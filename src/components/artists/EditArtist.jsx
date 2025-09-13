import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArtistsContext } from "./ArtistsProvider"

export const EditArtist = () => {
    const [artist, setArtist] = useState({})
    const { id } = useParams()
    const { getArtistById, updateArtist } = useContext(ArtistsContext)

    const navigate = useNavigate()

    useEffect(() => {
        getArtistById(parseInt(id)).then(setArtist)
    }, [])

    const handleChange = e => {
        const copyArtist = { ...artist }
        copyArtist[e.target.id] = e.target.value
        setArtist(copyArtist)
    }

    const handleClick = e => {
        e.preventDefault()
        if (
            artist.name === "" ||
            artist.email === "" ||
            artist.imageUrl === ""
        ) {
            window.alert("Fill out the form")
        } else {
            updateArtist(artist.id, artist)
            navigate(`/artists/${artist.id}`)
        }
    }

    return (
        <form
            action=""
            name="form"
            className="mx-auto mt-[5rem] flex w-[30rem] flex-col items-center gap-10"
        >
            <h1 className="text-center text-[5rem] font-bold tracking-wider">
                Edit Profile
            </h1>
            <fieldset className="mt-[2rem] flex w-full flex-col items-start gap-2">
                <label className="self-center pl-1 text-xl" htmlFor="name">
                    Name
                </label>
                <input
                    onChange={handleChange}
                    className="shadow-dark w-full rounded-2xl p-1 pl-2 shadow-sm"
                    type="text"
                    id="name"
                    value={artist.name}
                />
            </fieldset>
            <fieldset className="flex w-full flex-col items-start gap-2">
                <label className="self-center pl-1 text-xl" htmlFor="email">
                    Email
                </label>
                <input
                    onChange={handleChange}
                    className="shadow-dark w-full rounded-2xl p-1 pl-2 shadow-sm"
                    type="email"
                    id="email"
                    value={artist.email}
                />
            </fieldset>
            <fieldset className="flex w-full flex-col items-start gap-2">
                <label className="self-center pl-1 text-xl" htmlFor="imageUrl">
                    Image Url
                </label>
                <input
                    onChange={handleChange}
                    className="shadow-dark w-full rounded-2xl p-1 pl-2 shadow-sm"
                    type="text"
                    id="imageUrl"
                    value={artist.imageUrl}
                />
            </fieldset>
            <button
                onClick={handleClick}
                className="shadow-dark bg-blue-grey hover:bg-light-blue text-dark hover:text-light mt-[4rem] h-[3rem] w-[10rem] cursor-pointer rounded-2xl font-bold tracking-wider shadow-sm hover:scale-105"
            >
                Save Profile
            </button>
        </form>
    )
}
