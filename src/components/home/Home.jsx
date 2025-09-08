import React from "react"
import home from "../../../assets/images/home.jpg"

export const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="flex flex-col items-center justify-start text-[5rem] font-bold tracking-wider text-black text-shadow-lg">
                Willow Grove
            </h1>
            <div className="h-[30rem] w-[50rem] overflow-hidden rounded-3xl shadow-2xl shadow-black">
                <img
                    src={home}
                    alt="wedding"
                    className="relative top-[-12rem] mt-15 w-[50rem]"
                />
            </div>
        </div>
    )
}
