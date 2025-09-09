import { render, screen } from "@testing-library/react"
import React, { act } from "react"
import "@testing-library/jest-dom/vitest"
import { it, expect, describe, vi } from "vitest"
import { ArtistsContext } from "../src/components/artists/ArtistsProvider"
import { ArtistDetails } from "../src/components/artists/ArtistDetails"

const createTestWrapper = (contextValues = {}) => {
    const ArtistValues = {
        getArtistById: vi.fn().mockResolvedValue({
            id: 1,
            name: "test name",
            email: "test email",
            url: "test url"
        })
    }

    return ({ children }) => (
        <ArtistsContext.Provider value={ArtistValues}>
            {children}
        </ArtistsContext.Provider>
    )
}

describe("Artist Details Page", () => {
    it("renders an artists details", async () => {
        const TestWrapper = createTestWrapper()
        await act(async () => {
            render(<ArtistDetails />, { wrapper: TestWrapper })
        })

        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()

        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
            /test name/i
        )

        expect(screen.getByRole("img")).toBeInTheDocument()
        expect(screen.getByText(/test email/i)).toBeInTheDocument()
        expect(screen.getByText(/test email/i)).toBeInTheDocument()
    })
})
