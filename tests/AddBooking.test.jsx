import { render, screen } from "@testing-library/react"
import React from "react"
import "@testing-library/jest-dom/vitest"
import { it, expect, describe, vi, afterEach } from "vitest"
import { AddBooking } from "../src/components/Bookings/AddBooking"
import { ArtistsContext } from "../src/components/artists/ArtistsProvider"
import { EventsContext } from "../src/components/events/EventsProvider"
import { BookingsContext } from "../src/components/Bookings/BookingsProvider"
import { MemoryRouter } from "react-router-dom"

const createWrapper = (contextValues = {}) => {
    const {
        BookingValues = {
            booking: {},
            setBooking: vi.fn(),
            addBooking: vi.fn()
        },
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
        ArtistValues = {
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
        <ArtistsContext.Provider value={ArtistValues}>
            <EventsContext.Provider value={EventsValues}>
                <BookingsContext.Provider value={BookingValues}>
                    {children}
                </BookingsContext.Provider>
            </EventsContext.Provider>
        </ArtistsContext.Provider>
    )
}

afterEach(() => {
    vi.clearAllMocks()
})

describe("Add Booking", () => {
    it("renders a form", () => {
        const TestWrapper = createWrapper()

        render(
            <MemoryRouter>
                <AddBooking />
            </MemoryRouter>,
            {
                wrapper: TestWrapper
            }
        )

        expect(screen.getByRole("form")).toBeInTheDocument()
        expect(screen.getByLabelText(/event type/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/city/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
        expect(
            screen.getByRole("button", {
                name: /save/i
            })
        ).toBeInTheDocument()
    })

    it("should have default values ", () => {
        const TestWrapper = createWrapper()

        render(
            <MemoryRouter>
                <AddBooking />
            </MemoryRouter>,
            {
                wrapper: TestWrapper
            }
        )

        expect(screen.getByLabelText(/event type/i)).toHaveTextContent(
            /what type of event/i
        )
        expect(screen.getByLabelText(/city/i)).toHaveTextContent(/what city\?/i)
        expect(screen.getByLabelText(/date/i)).toHaveValue("")
    })
})
