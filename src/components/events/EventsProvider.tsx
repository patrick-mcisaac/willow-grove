import type { Events, EventsContextType } from "@/types/EventsTypes"
import React, { createContext, useContext, useState } from "react"

interface Props {
    children: React.ReactNode
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
