import { render, screen } from "@testing-library/react"
import React from "react"
import "@testing-library/jest-dom/vitest"
import { it, expect, describe, vi } from "vitest"
import { Artists } from "../src/components/artists/Artists"
import { ArtistsList } from "../src/components/artists/ArtistsList"
import { ArtistsContext } from "../src/components/artists/ArtistsProvider"

const createTestWrapper = (contextValues = {}) => {
    const {
        ArtistsValues = {
            artists: [
                {
                    id: 1,
                    name: "test name",
                    email: "test email",
                    imageUrl: "test url"
                }
            ],
            getArtists: vi.fn()
        }
    } = contextValues

    return ({ children }) => (
        <ArtistsContext.Provider value={ArtistsValues}>
            {children}
        </ArtistsContext.Provider>
    )
}

vi.mock("../src/components/artists/ArtistsList", () => {
    return {
        ArtistsList: () => <div data-testid="artist list"></div>
    }
})

describe("Artists", () => {
    it("renders h1 with artists", () => {
        const TestWrapper = createTestWrapper()

        render(<Artists />, { wrapper: TestWrapper })
        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
            /our artists/i
        )
    })

    it("renders ArtistList Component", () => {
        const TestWrapper = createTestWrapper()
        render(<Artists />, { wrapper: TestWrapper })
        expect(screen.getByTestId("artist list")).toBeInTheDocument()
    })
})
