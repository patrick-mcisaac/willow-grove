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
    getBookings: (id: string) => Promise<Response>
    removeBooking: (id: string) => void
    getBookingById: (id: string) => void
    addBooking: (data: Booking) => Promise<Response>
    editBooking: (id: string, data: Booking) => Promise<Response>
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
