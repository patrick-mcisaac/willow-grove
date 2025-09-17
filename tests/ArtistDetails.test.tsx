import { render, screen } from "@testing-library/react"
import React, { act } from "react"
import "@testing-library/jest-dom/vitest"
import { it, expect, describe, vi } from "vitest"
import { ArtistsContext } from "../src/components/artists/ArtistsProvider"
import { ArtistDetails } from "../src/components/artists/ArtistDetails"
import { MemoryRouter, Route, Routes } from "react-router-dom"

interface Props {
    children: React.ReactNode
}

const createTestWrapper = (contextValues = {}) => {
    const {
        ArtistValues = {
            artists: undefined,
            artistLocations: [],
            getArtists: vi.fn(),
            getArtistById: vi.fn().mockResolvedValue({
                id: 1,
                name: "test name",
                email: "test email",
                imageUrl: "test url"
            }),
            addArtist: vi.fn(),
            updateArtist: vi.fn(),
            getArtistLocations: vi.fn()
        }
    } = contextValues

    return ({ children }: Props) => (
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

        screen.debug()

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
