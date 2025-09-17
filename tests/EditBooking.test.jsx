import { render, screen } from "@testing-library/react"
import React from "react"
import "@testing-library/jest-dom/vitest"
import { it, expect, describe, vi, afterEach } from "vitest"
import { EditBooking } from "../src/components/Bookings/EditBooking"

import { MemoryRouter, Route, Routes } from "react-router-dom"
import { EventsContext } from "../src/components/events/EventsContext"
import { BookingsContext } from "../src/components/Bookings/BookingsContext"
import { ArtistsContext } from "../src/components/artists/ArtistContext"

const createWrapper = (contextValues = {}) => {
    const {
        EventsValues = {
            getEvents: vi.fn(),
            events: [
                {
                    id: 1,
                    name: "Weddings",
                    description:
                        "Professional wedding photography services including ceremony, reception, and portrait sessions"
                },
                {
                    id: 2,
                    name: "Corporate Event",
                    description:
                        "Business events, conferences, and professional photography for corporate functions"
                },
                {
                    id: 3,
                    name: "Private Party",
                    description:
                        "Birthday parties, anniversaries, family gatherings, and other private celebrations"
                }
            ]
        },
        BookingsValues = {
            booking: {
                id: 8,
                userId: 1,
                eventTypeId: 2,
                locationId: 1,
                date: "2025-11-29"
            },
            editBooking: vi.fn(),
            setBooking: vi.fn(),
            getBookingById: vi.fn()
        },
        ArtistsValues = {
            artistLocations: [
                {
                    id: 1,
                    locationId: 1,
                    userId: 1,
                    location: {
                        id: 1,
                        city: "New York",
                        imageUrl:
                            "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80"
                    }
                }
            ],
            getArtistsLocations: vi.fn()
        }
    } = contextValues

    return ({ children }) => (
        <EventsContext.Provider value={EventsValues}>
            <BookingsContext.Provider value={BookingsValues}>
                <ArtistsContext.Provider value={ArtistsValues}>
                    {children}
                </ArtistsContext.Provider>
            </BookingsContext.Provider>
        </EventsContext.Provider>
    )
}

afterEach(() => {
    vi.clearAllMocks()
})

describe("Edit Booking Form", () => {
    it("should render a form", () => {
        const TestWrapper = createWrapper()

        render(
            <MemoryRouter initialEntries={["/artists/1/booking/8/edit"]}>
                <Routes>
                    <Route
                        path="/artists/:id/booking/:bookingId/edit"
                        element={<EditBooking />}
                    />
                </Routes>
            </MemoryRouter>,
            { wrapper: TestWrapper }
        )

        expect(screen.getByRole("form")).toBeInTheDocument()
        expect(
            screen.getByRole("button", { name: /save/i })
        ).toBeInTheDocument()
    })

    it("should have form elements filled out with current data", () => {
        const TestWrapper = createWrapper()

        render(
            <MemoryRouter initialEntries={["/artists/1/booking/8/edit"]}>
                <Routes>
                    <Route
                        path="/artists/:id/booking/:bookingId/edit"
                        element={<EditBooking />}
                    />
                </Routes>
            </MemoryRouter>,
            { wrapper: TestWrapper }
        )

        expect(screen.getByLabelText(/event type/i)).toHaveValue("2")
        expect(screen.getByLabelText(/event type/i)).toHaveTextContent(
            /corporate event/i
        )

        expect(screen.getByLabelText(/city/i)).toHaveValue("1")
        expect(screen.getByLabelText(/city/i)).toHaveTextContent(/new york/i)

        expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/date/i)).toHaveValue("2025-11-29")
    })

    it("should have Save Button", () => {
        const TestWrapper = createWrapper()

        render(
            <MemoryRouter initialEntries={["/artists/1/booking/8/edit"]}>
                <Routes>
                    <Route
                        path="/artists/:id/booking/:bookingId/edit"
                        element={<EditBooking />}
                    />
                </Routes>
            </MemoryRouter>,
            { wrapper: TestWrapper }
        )

        expect(
            screen.getByRole("button", { name: /save/i })
        ).toBeInTheDocument()
    })
})
