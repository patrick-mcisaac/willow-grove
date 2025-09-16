export interface Booking {
    userId: number
    eventTypeId: number
    locationId: number
    date: string
}

export interface BookingsContextType {
    booking: Booking | {}
    setBooking: React.Dispatch<React.SetStateAction<Booking | {}>>
    getBookings: (id: string) => Promise<any>
    removeBooking: (id: string) => void
    getBookingById: (id: string) => void
    addBooking: (data: Booking) => Promise<Response>
    editBooking: (id: string, data: Booking) => Promise<Response>
}
