import React, { type JSX } from "react"
import home from "../../../assets/images/home.jpg"

export const Home = (): JSX.Element => {
    return (
        <div className="mt-[1rem] flex flex-col items-center justify-center gap-10 lg:mt-[5rem]">
            <h1 className="flex flex-col items-center justify-start text-[5rem] font-bold tracking-wider text-black text-shadow-lg">
                Willow Grove
            </h1>
            <div className="overflow-hidden rounded-3xl shadow-2xl shadow-black sm:h-[37rem] sm:w-[30rem] lg:h-[30rem] lg:w-[50rem]">
                <img
                    src={home}
                    alt="wedding"
                    className="top: relative top-[-11rem] mt-15 lg:top-[-15rem]"
                />
            </div>
        </div>
    )
}
