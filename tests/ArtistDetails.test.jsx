import { render, screen } from "@testing-library/react"
import React, { act } from "react"
import "@testing-library/jest-dom/vitest"
import { it, expect, describe, vi } from "vitest"
import { ArtistDetails } from "../src/components/artists/ArtistDetails"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { ArtistsContext } from "../src/components/artists/ArtistContext"

const createTestWrapper = (contextValues = {}) => {
    const {
        ArtistValues = {
            getArtistById: vi.fn().mockResolvedValue({
                id: 1,
                name: "test name",
                email: "test email",
                url: "test url"
            })
        }
    } = contextValues

    return ({ children }) => (
        <ArtistsContext.Provider value={ArtistValues}>
            {children}
        </ArtistsContext.Provider>
    )
}
vi.mock("../src/components/Bookings/Bookings", () => {
    return {
        Bookings: () => <div data-testid="bookings"></div>
    }
})

describe("Artist Details Page", () => {
    it("renders an artists details", async () => {
        const TestWrapper = createTestWrapper()
        await act(async () => {
            render(
                <MemoryRouter initialEntries={["/artists/1"]}>
                    <Routes>
                        <Route
                            path="/artists/:id"
                            element={<ArtistDetails />}
                        />
                    </Routes>
                </MemoryRouter>,

                { wrapper: TestWrapper }
            )
        })

        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()

        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
            /test name/i
        )

        expect(screen.getByRole("img")).toBeInTheDocument()
        expect(screen.getByText(/test email/i)).toBeInTheDocument()
        expect(screen.getByText(/test email/i)).toBeInTheDocument()
        expect(screen.getByTestId("bookings")).toBeInTheDocument()
    })
})
