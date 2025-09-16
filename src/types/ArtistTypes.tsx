export interface Artists {
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
    artists: Artists[] | []
    artistLocations: ArtistLocations[] | []
    getArtists: () => void
    getArtistById: (id: string) => Promise<any>
    addArtist: (data: Artists) => void
    updateArtist: (id: string, data: Artists) => void
    getArtistsLocations: (id: string) => void
}
