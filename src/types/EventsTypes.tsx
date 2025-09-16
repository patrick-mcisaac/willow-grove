/* export interface Events {
    id: number
    userId: number
    eventTypeId: number
    locationId: number
    date: string
    user: {
        email: string
        id: number
        imageUrl: string
        name: string
    }
    location: {
        id: number
        city: string
        imageUrl: string
    }
    eventType: {
        description: string
        name: string
        id: number
    }
} */

export interface Events {
    description: string
    name: string
    id: number
}

export interface EventsContextType {
    getEvents: () => void
    events: Events[]
}
