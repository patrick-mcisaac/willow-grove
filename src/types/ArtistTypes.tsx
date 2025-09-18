export interface Artist {
    id?: number
    name: string
    email: string
    imageUrl: string
}

export interface ArtistLocations {
    id: number
    locationId: number
    userId: number
    location: {
        id: number
        city: string
        imageUrl: string
    }
}

export interface ArtistContextType {
    artists: Artist[] | []
    artistLocations: ArtistLocations[] | []
    getArtists: () => void
    getArtistById: (id: string) => Promise<any>
    addArtist: (data: Artist) => void
    updateArtist: (id: string, data: Artist) => void
    getArtistsLocations: (id: string | undefined) => void
    deleteArtist: (id: string) => Promise<void>
}

export interface ArtistRegistration {
    name: string
    email: string
    imageUrl: string
}
