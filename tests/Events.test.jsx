import { render, screen } from "@testing-library/react"
import React, { useContext } from "react"
import "@testing-library/jest-dom/vitest"
import { it, expect, describe, vi } from "vitest"
import { Events } from "../src/components/events/Events"
import { EventsList } from "../src/components/events/EventsList"
import { EventsContext } from "../src/components/events/EventsProvider"

const createTestWrapper = (contextValues = {}) => {
    const {
        EventValues = {
            events: [
                {
                    id: 1,
                    name: "Test Name",
                    description: "Test Description"
                }
            ],
            getEvents: vi.fn()
        }
    } = contextValues

    return ({ children }) => (
        <EventsContext.Provider value={EventValues}>
            {children}
        </EventsContext.Provider>
    )
}

vi.mock("../src/components/events/EventsList", () => {
    return {
        EventsList: () => <div data-testid="events-list"></div>
    }
})

describe("Events", () => {
    it("renders events names", () => {
        const TestWrapper = createTestWrapper()

        render(<Events />, { wrapper: TestWrapper })
        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
            "Our Events"
        )
        expect(screen.getByTestId("events-list")).toBeInTheDocument()
    })
})
