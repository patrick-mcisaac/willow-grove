import type { LocationChoices, Locations } from "@/types/LocationTypes"
import React, { useEffect, useState } from "react"

interface Props {
    location: Locations
    artistLocationChoices: LocationChoices[] | undefined
    setArtistLocationChoices: React.Dispatch<
        React.SetStateAction<LocationChoices[] | undefined>
    >
}

export const LocationsCheckbox = ({
    location,
    artistLocationChoices,
    setArtistLocationChoices
}: Props) => {
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (checked) {
            const copyLocationChoices = [...artistLocationChoices]

            const found: LocationChoices[] = copyLocationChoices.map(l => {
                if (l.locationId === location.id) {
                    l.isChecked = true
                }
                return l
            })

            setArtistLocationChoices(found)
        } else {
            const copyLocationChoices = [...artistLocationChoices]

            const found = copyLocationChoices.map(l => {
                if (l.locationId === location.id) {
                    l.isChecked = false
                }
                return l
            })

            setArtistLocationChoices(found)
        }
    }, [checked])

    const handleClick = e => {
        setChecked(e.target.checked)
    }
    return (
        <>
            <label
                htmlFor={`location${location.id}`}
                className="flex w-[32%] items-center justify-between"
            >
                {location.city}
                <input
                    className=""
                    onClick={handleClick}
                    type="checkbox"
                    id={`location${location.id}`}
                    name="city"
                    value={location.id}
                    checked={checked}
                />
            </label>
        </>
    )
}
