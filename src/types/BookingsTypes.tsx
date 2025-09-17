export interface Booking {
    id?: number
    userId?: number
    eventTypeId?: number
    locationId?: number
    date?: string
}

export interface BookingsContextType {
    booking: Booking | undefined
    setBooking: React.Dispatch<React.SetStateAction<Booking | undefined>>
    getBookings: (id: string | undefined) => Promise<any>
    removeBooking: (id: number) => Promise<Response>
    getBookingById: (id: string | undefined) => void
    addBooking: (data: Booking | undefined) => Promise<Response>
    editBooking: (
        id: string | undefined,
        data: Booking | undefined
    ) => Promise<Response>
}

export interface BookingsExpanded {
    id: number
    date: string
    eventTypeId: number
    locationId: number
    userId: number
    eventType: {
        description: string
        id: number
        name: string
    }
    location: {
        id: number
        city: string
        imageUrl: string
    }
    user: {
        id: number
        email: string
        imageUrl: string
        name: string
    }
}
