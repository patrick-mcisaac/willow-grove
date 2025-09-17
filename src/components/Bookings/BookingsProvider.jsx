import { createContext, useState } from "react"

export const BookingsContext = createContext()

export const BookingsProvider = ({ children }) => {
    const [booking, setBooking] = useState({})

    const getBookings = id => {
        return fetch(
            `http://localhost:8088/bookings?_expand=user&_expand=location&_expand=eventType&userId=${id}`
        ).then(res => res.json())
    }

    const removeBooking = id => {
        return fetch(`http://localhost:8088/bookings/${id}`, {
            method: "DELETE"
        })
    }

    const getBookingById = id => {
        fetch(`http://localhost:8088/bookings/${id}`)
            .then(res => res.json())
            .then(setBooking)
    }

    const addBooking = data => {
        return fetch(`http://localhost:8088/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    const editBooking = (id, data) => {
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
