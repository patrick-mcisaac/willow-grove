import React from "react"

export const EventsList = ({ event }) => {
    return (
        <section className="mx-auto mt-15 flex flex-col items-center justify-start gap-10">
            <h2 className="text-2xl font-semibold">{event.name}</h2>
            <p className="max-w-[30rem] text-center">{event.description}</p>
        </section>
    )
}
