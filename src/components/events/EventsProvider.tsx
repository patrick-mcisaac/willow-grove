import React, { createContext, useContext, useState } from "react"

interface Props {
    children: React.ReactNode
}

interface Events {
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
}

interface EventsContextType {
    getEvents: () => void
    events: Events[]
}

export const EventsContext = createContext<EventsContextType | undefined>(
    undefined
)

export const EventsProvider = ({ children }: Props) => {
    const [events, setEvents] = useState<Events[]>([])

    const getEvents = (): void => {
        fetch(`http://localhost:8088/eventTypes`)
            .then(res => res.json())
            .then(setEvents)
    }

    return (
        <EventsContext.Provider value={{ events, getEvents }}>
            {children}
        </EventsContext.Provider>
    )
}

export const useEvents = () => {
    const context = useContext(EventsContext)
    if (!context) {
        throw new Error("useEvents must be used within EventsProvider")
    }
    return context
}
