import { render, screen } from "@testing-library/react"
import React, { useContext } from "react"
import "@testing-library/jest-dom/vitest"
import { it, expect, describe, vi } from "vitest"
import { Events } from "../src/components/events/Events"
import { EventsList } from "../src/components/events/EventsList"

describe("Events", () => {
    vi.mock("react", async () => {
        const actual = await vi.importActual("react")
        return {
            ...actual,
            useContext: vi.fn()
        }
    })

    vi.mock("../src/components/events/EventsList", () => {
        return {
            EventsList: () => <div data-testid="events-list"></div>
        }
    })

    it("renders events names", () => {
        useContext.mockReturnValue({
            events: [
                {
                    id: 1,
                    name: "Test Name",
                    description: "Test Description"
                }
            ],
            getEvents: vi.fn()
        })
        render(<Events />)
        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
            "Our Events"
        )
        expect(screen.getByTestId("events-list")).toBeInTheDocument()
    })
})
