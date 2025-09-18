import type React from "react"

export interface Locations {
    id: number
    city: string
    imageUrl: string
}

export interface ArtistLocation {
    id?: number
    locationId: number
    userId: number
}

export interface LocationContextType {
    locations: Locations[] | []
    getLocations: () => void
    addArtistLocation: (data: ArtistLocation) => Promise<Response>
    allArtistsLocations: ArtistLocation[] | []
    setAllArtistsLocations: React.Dispatch<
        React.SetStateAction<ArtistLocation[] | []>
    >
    getAllArtistsLocations: () => void
}

export interface LocationChoices {
    isChecked: boolean
    locationId: number
    userId: number
}
