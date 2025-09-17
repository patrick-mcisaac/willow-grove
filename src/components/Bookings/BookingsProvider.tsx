import type { Booking, BookingsContextType } from "@/types/BookingsTypes"
import React, {
    createContext,
    useContext,
    useState,
    type ReactNode
} from "react"

interface Props {
    children: React.ReactNode
}

export const BookingsContext = createContext<BookingsContextType | undefined>(
    undefined
)

export const BookingsProvider = ({ children }: Props) => {
    const [booking, setBooking] = useState<Booking | undefined>(undefined)

    const getBookings = (id: string | undefined): Promise<any> => {
        return fetch(
            `http://localhost:8088/bookings?_expand=user&_expand=location&_expand=eventType&userId=${id}`
        ).then(res => res.json())
    }

    const removeBooking = (id: number): void => {
        fetch(`http://localhost:8088/bookings/${id}`, {
            method: "DELETE"
        })
    }

    const getBookingById = (id: string | undefined): void => {
        fetch(`http://localhost:8088/bookings/${id}`)
            .then(res => res.json())
            .then(setBooking)
    }

    const addBooking = (data: Booking): Promise<Response> => {
        return fetch(`http://localhost:8088/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    const editBooking = (
        id: string | undefined,
        data: Booking | undefined
    ): Promise<Response> => {
        return fetch(`http://localhost:8088/bookings/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    return (
        <BookingsContext.Provider
            value={{
                getBookingById,
                booking,
                setBooking,
                getBookings,
                removeBooking,
                addBooking,
                editBooking
            }}
        >
            {children}
        </BookingsContext.Provider>
    )
}

/* Custom Hook */

export const useBookings = () => {
    const context = useContext(BookingsContext)
    if (!context) {
        throw new Error("useBookings must be used within BookingsProvider")
    }
    return context
}
