import { render, screen } from "@testing-library/react"
import React from "react"
import "@testing-library/jest-dom/vitest"
import { it, expect, describe, vi, beforeEach } from "vitest"
import { BookingsList } from "../src/components/Bookings/BookingsList"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { BookingsContext } from "../src/components/Bookings/BookingsContext"
import { UserContext } from "../src/views/UserContext"

const createWrapper = (contextValues = {}) => {
    const {
        UserValues = {
            currentUser: 1
        },
        BookingsValue = {
            removeBooking: vi.fn()
        }
    } = contextValues

    return ({ children }) => (
        <BookingsContext.Provider value={BookingsValue}>
            <UserContext.Provider value={UserValues}>
                {children}
            </UserContext.Provider>
        </BookingsContext.Provider>
    )
}

beforeEach(() => {
    vi.clearAllMocks()
})

describe("Bookings List", () => {
    it("should render bookings", () => {
        const TestWrapper = createWrapper()
        const { container } = render(
            <MemoryRouter initialEntries={["/artists/1"]}>
                <Routes>
                    <Route
                        path="/artists/:id"
                        element={
                            <BookingsList
                                setBookings={vi.fn()}
                                getBookings={vi.fn()}
                                booking={{
                                    id: 8,
                                    userId: 1,
                                    eventTypeId: 2,
                                    locationId: 6,
                                    date: "2025-11-29",
                                    user: {
                                        id: 1,
                                        name: "Midnight Echo",
                                        email: "midnight.echo@music.com",
                                        imageUrl:
                                            "https://images.unsplash.com/photo-1732559417596-eb4bdc7eb639?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    },
                                    location: {
                                        id: 6,
                                        city: "Austin",
                                        imageUrl:
                                            "https://unsplash.com/photos/man-in-black-jacket-walking-on-bridge-near-body-of-water-during-daytime-ztVcGTSD8xw"
                                    },
                                    eventType: {
                                        id: 2,
                                        name: "Corporate Event",
                                        description:
                                            "Business events, conferences, and professional photography for corporate functions"
                                    }
                                }}
                            />
                        }
                    />
                </Routes>
            </MemoryRouter>,
            { wrapper: TestWrapper }
        )

        const trashIcon = container.querySelector(".fa-regular.fa-trash-can")

        expect(screen.getByText(/corporate event/i)).toBeInTheDocument()
        expect(screen.getByText(/austin/i)).toBeInTheDocument()
        expect(screen.getByText(/2025-11-29/i)).toBeInTheDocument()
        expect(
            screen.getByRole("button", { name: /edit/i })
        ).toBeInTheDocument()
        expect(trashIcon).toBeInTheDocument()
    })

    it("Doesnt render buttons when not on your profile", () => {
        const TestWrapper = createWrapper()

        const { container } = render(
            <MemoryRouter initialEntries={["/artists/2"]}>
                <Routes>
                    <Route
                        path="/artists/:id"
                        element={
                            <BookingsList
                                setBookings={vi.fn()}
                                getBookings={vi.fn()}
                                booking={{
                                    id: 8,
                                    userId: 1,
                                    eventTypeId: 2,
                                    locationId: 6,
                                    date: "2025-11-29",
                                    user: {
                                        id: 1,
                                        name: "Midnight Echo",
                                        email: "midnight.echo@music.com",
                                        imageUrl:
                                            "https://images.unsplash.com/photo-1732559417596-eb4bdc7eb639?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    },
                                    location: {
                                        id: 6,
                                        city: "Austin",
                                        imageUrl:
                                            "https://unsplash.com/photos/man-in-black-jacket-walking-on-bridge-near-body-of-water-during-daytime-ztVcGTSD8xw"
                                    },
                                    eventType: {
                                        id: 2,
                                        name: "Corporate Event",
                                        description:
                                            "Business events, conferences, and professional photography for corporate functions"
                                    }
                                }}
                            />
                        }
                    />
                </Routes>
            </MemoryRouter>,
            { wrapper: TestWrapper }
        )

        const trashIcon = container.querySelector(".fa-regular.fa-trash-can")

        expect(trashIcon).not.toBeInTheDocument()
        expect(
            screen.queryByRole("button", { name: /edit/i })
        ).not.toBeInTheDocument()
    })
})
