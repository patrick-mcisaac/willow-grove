import React from "react"

export const EventsList = ({ event }) => {
    return (
        <section className="mx-auto mt-[3rem] flex flex-col items-center justify-evenly rounded-2xl border-1 shadow-xl transition hover:scale-105 md:h-[10rem] md:w-[50rem]">
            <h2 className="text-2xl font-semibold">{event.name}</h2>
            <p className="max-w-[30rem] text-center">{event.description}</p>
        </section>
    )
}
