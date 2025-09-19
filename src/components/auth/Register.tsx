import React, { useEffect, useState } from "react"
import { useArtists } from "../artists/ArtistsProvider.js"
import { useLocations } from "../locations/LocationsProvider.js"
import { LocationsCheckbox } from "./LocationsCheckbox.js"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../views/UserProvider.js"
import type { ArtistRegistration, Artists } from "@/types/ArtistTypes.js"
import type { LocationChoices } from "@/types/LocationTypes.js"

export const Register = () => {
    const [newUser, setNewUser] = useState<ArtistRegistration>({
        name: "",
        email: "",
        imageUrl: ""
    })

    const { addArtist, getArtists, artists } = useArtists()
    const { locations, getLocations, addArtistLocation } = useLocations()
    const { setCurrentUser } = useUser()
    const [artistLocationChoices, setArtistLocationChoices] = useState<
        LocationChoices[] | []
    >([])

    const navigate = useNavigate()

    useEffect(() => {
        getLocations()
        getArtists()
    }, [])

    // setup state for all possible choices for locations

    useEffect(() => {
        if (artists) {
            const choiceOptions: LocationChoices[] = locations.map(l => {
                return {
                    isChecked: false,
                    locationId: l.id,
                    userId: artists.length + 1
                }
            })
            setArtistLocationChoices(choiceOptions)
        }
    }, [locations, artists])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copyUser: ArtistRegistration = { ...newUser }

        copyUser[e.target.id as keyof ArtistRegistration] = e.target.value
        setNewUser(copyUser)
    }

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (
            newUser.name === "" ||
            newUser.email === "" ||
            newUser.imageUrl === ""
        ) {
            window.alert("fill out the form")
        } else {
            await addArtist(newUser)

            const filteredLocations = artistLocationChoices?.filter(l => {
                return l.isChecked === true
            })

            // create data for artist location post
            const locationData = filteredLocations?.map(l => {
                return {
                    locationId: l.locationId,
                    userId: l.userId
                }
            })

            // for each post the data
            if (locationData !== undefined) {
                locationData.forEach(data => {
                    addArtistLocation(data)
                })

                localStorage.setItem(
                    "currentUserId",
                    String(locationData[0]?.userId)
                )
                setCurrentUser(locationData[0]?.userId)
                navigate(`/artists/${locationData[0]?.userId}`)
            }
        }
    }

    return (
        <form
            action=""
            name="form"
            className="mx-auto flex w-[20rem] flex-col items-center justify-center gap-5 p-[1rem] md:gap-10"
        >
            <h1 className="text-[2.5rem] font-bold tracking-wider md:text-[5rem]">
                Register
            </h1>
            <fieldset className="flex w-full flex-col items-start gap-2">
                <label
                    className="self-center pl-1 text-lg md:text-xl"
                    htmlFor="name"
                >
                    Name
                </label>
                <input
                    onChange={handleChange}
                    className="shadow-dark w-full rounded-2xl pl-2 shadow-sm md:p-1"
                    type="text"
                    id="name"
                    value={newUser.name}
                    placeholder="Name"
                />
            </fieldset>
            <fieldset className="flex w-full flex-col items-start gap-2">
                <label
                    className="self-center pl-1 text-lg md:text-xl"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    onChange={handleChange}
                    className="shadow-dark w-full rounded-2xl pl-2 shadow-sm md:p-1"
                    type="email"
                    id="email"
                    value={newUser.email}
                    placeholder="Email"
                />
            </fieldset>
            <fieldset className="flex w-full flex-col items-start gap-2">
                <label
                    className="self-center pl-1 text-lg md:text-xl"
                    htmlFor="imageUrl"
                >
                    Image Url
                </label>
                <input
                    onChange={handleChange}
                    className="shadow-dark w-full rounded-2xl pl-2 shadow-sm md:p-1"
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
