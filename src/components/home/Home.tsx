import React, { type JSX } from "react"
import home from "../../assets/images/home.jpg"

export const Home = (): JSX.Element => {
    return (
        <div className="d:gap-10 flex h-[80vh] flex-col items-center justify-center gap-[3rem] lg:mt-2">
            <h1 className="flex flex-col items-center justify-start text-center text-[3rem] font-bold tracking-wider text-black text-shadow-lg md:text-[5rem]">
                Willow Grove
            </h1>
            <div className="h-[20rem] w-[20rem] overflow-hidden rounded-3xl shadow-2xl shadow-black md:h-[37rem] md:w-[30rem] lg:h-[30rem] lg:w-[50rem]">
                <img
                    src={home}
                    alt="wedding"
                    className="top: relative top-[-11rem] mt-15 lg:top-[-15rem]"
                />
            </div>
        </div>
    )
}
