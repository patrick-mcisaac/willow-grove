import React from "react"
import { vi } from "vitest"
import { ArtistsContext } from "../../src/components/artists/ArtistsProvider"
import { LocationsContext } from "../../src/components/locations/LocationsProvider"

interface Props {
    children: React.ReactNode
}

export const createWrapper = (contextValues = {}) => {
    const {
        ArtistsValues = {
            artists: [
                {
                    id: 1,
                    name: "testName",
                    email: "testEmail",
                    imageUrl: "testImage"
                }
            ],
            getArtists: vi.fn()
        },
        LocationsValues = {
            locations: [
                {
                    id: 1,
                    city: "test-city",
                    imageUrl: "testImage"
                }
            ],
            getLocations: vi.fn(),
            getAllArtistsLocations: vi.fn(),
            allArtistsLocations: [
                {
                    id: 1,
                    locationId: 1,
                    userId: 1
                }
            ]
        }
    } = contextValues

    return ({ children }: Props) => (
        <ArtistsContext.Provider value={ArtistsValues}>
            <LocationsContext.Provider value={LocationsValues}>
                {children}
            </LocationsContext.Provider>
        </ArtistsContext.Provider>
    )
}
