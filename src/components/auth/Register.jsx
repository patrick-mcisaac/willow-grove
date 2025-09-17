import React, { useContext, useEffect, useState } from "react"
import { LocationsContext } from "../locations/LocationsProvider"
import { LocationsCheckbox } from "./LocationsCheckbox"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../views/UserProvider"
import { ArtistsContext } from "../artists/ArtistContext"

export const Register = () => {
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        imageUrl: ""
    })

    const { addArtist, getArtists, artists } = useContext(ArtistsContext)
    const { locations, getLocations, addArtistLocation } =
        useContext(LocationsContext)
    const { setCurrentUser } = useContext(UserContext)
    const [artistLocationChoices, setArtistLocationChoices] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getLocations()
        getArtists()
    }, [])

    // setup state for all possible choices for locations

    useEffect(() => {
        const choiceOptions = locations.map(l => {
            return {
                isChecked: false,
                locationId: l.id,
                userId: artists.length + 1
            }
        })

        setArtistLocationChoices(choiceOptions)
    }, [locations, artists])

    const handleChange = e => {
        const copyUser = { ...newUser }
        copyUser[e.target.id] = e.target.value
        setNewUser(copyUser)
    }

    const handleClick = e => {
        e.preventDefault()

        if (
            newUser.name === "" ||
            newUser.email === "" ||
            newUser.imageUrl === ""
        ) {
            window.alert("fill out the form")
        } else {
            addArtist(newUser)
        }

        const filteredLocations = artistLocationChoices.filter(l => {
            return l.isChecked === true
        })

        console.log(filteredLocations)

        // create data for artist location post
        const locationData = filteredLocations.map(l => {
            return {
                locationId: l.locationId,
                userId: l.userId
            }
        })

        // for each post the data

        locationData.forEach(data => {
            addArtistLocation(data)
        })

        localStorage.setItem("currentUserId", locationData[0].userId)
        setCurrentUser(locationData[0].userId)
        navigate(`/artists/${locationData[0].userId}`)
    }

    return (
        <form
            action=""
            name="form"
            className="mx-auto mt-[5rem] flex w-[20rem] flex-col items-center gap-10"
        >
            <h1 className="text-[5rem] font-bold tracking-wider">Register</h1>
            <fieldset className="flex w-full flex-col items-start gap-2">
                <label className="self-center pl-1 text-xl" htmlFor="name">
                    Name
                </label>
                <input
                    onChange={handleChange}
                    className="shadow-dark w-full rounded-2xl p-1 pl-2 shadow-sm"
                    type="text"
                    id="name"
                    value={newUser.name}
                    placeholder="Name"
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
                    value={newUser.email}
                    placeholder="Email"
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
                    value={newUser.imageUrl}
                    placeholder="Image Url"
                />
            </fieldset>

            <fieldset className="flex w-[20rem] flex-wrap items-center justify-between gap-[1rem]">
                {locations.map(l => (
                    <LocationsCheckbox
                        key={l.id}
                        // artists={artists}
                        artistLocationChoices={artistLocationChoices}
                        setArtistLocationChoices={setArtistLocationChoices}
                        location={l}
                    />
                ))}
            </fieldset>

            <button
                onClick={handleClick}
                className="shadow-dark bg-blue-grey hover:bg-light-blue text-dark hover:text-light h-[3rem] w-[6rem] cursor-pointer rounded-2xl font-bold tracking-wider shadow-sm hover:scale-105"
            >
                Register
            </button>
        </form>
    )
}
