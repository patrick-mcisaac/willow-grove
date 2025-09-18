import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import "@testing-library/jest-dom/vitest"
import { it, expect, describe, vi, afterEach } from "vitest"
import { createWrapper } from "./test-utils/FilterBarTestWrapper"
import { FilterBar } from "../src/components/artists/FilterBar"

describe("FilterBar", () => {
    const TestWrapper = createWrapper()

    afterEach(() => {
        vi.clearAllMocks()
    })

    it("renders a search bar", () => {
        render(
            <FilterBar
                setFilteredArtists={vi.fn()}
                artists={[
                    {
                        id: 1,
                        name: "testName",
                        email: "testEmail",
                        imageUrl: "testImage"
                    }
                ]}
            />,
            { wrapper: TestWrapper }
        )

        expect(screen.getByRole("combobox")).toBeInTheDocument()
        expect(screen.getByRole("combobox")).toHaveValue("0")

        expect(screen.getByRole("textbox")).toBeInTheDocument()
        expect(screen.getByRole("textbox")).toHaveValue("")
    })

    it("should update value when clicked", async () => {
        const user = userEvent.setup()

        render(
            <FilterBar
                setFilteredArtists={vi.fn()}
                artists={[
                    {
                        id: 1,
                        name: "testName",
                        email: "testEmail",
                        imageUrl: "testImage"
                    }
                ]}
            />,
            { wrapper: TestWrapper }
        )

        const selectElement = screen.getByRole("combobox")

        await user.selectOptions(selectElement, "1")

        expect(selectElement).toHaveValue("1")
        expect(selectElement).toHaveTextContent("test-city")
    })

    it("should update when typed in search bar", async () => {
        const user = userEvent.setup()

        render(
            <FilterBar
                setFilteredArtists={vi.fn()}
                artists={[
                    {
                        id: 1,
                        name: "testName",
                        email: "testEmail",
                        imageUrl: "testImage"
                    }
                ]}
            />,
            { wrapper: TestWrapper }
        )

        const search = screen.getByRole("textbox")
        await user.type(search, "test-type")

        expect(search).toHaveValue("test-type")
        expect(search).toHaveDisplayValue("test-type")
    })
})
