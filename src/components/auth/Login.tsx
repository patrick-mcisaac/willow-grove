import React, { useEffect, useState } from "react"
import { useArtists } from "../artists/ArtistsProvider.js"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../views/UserProvider.js"

export const Login = () => {
    const [userLogin, setUserLogin] = useState({
        email: ""
    })

    const { artists, getArtists } = useArtists()
    const { setCurrentUser } = useUser()

    const navigate = useNavigate()

    useEffect(() => {
        getArtists()
    }, [])

    const handleChange = e => {
        const copyLogin = { ...userLogin }
        copyLogin[e.target.id] = e.target.value
        setUserLogin(copyLogin)
    }

    const handleLogin = e => {
        e.preventDefault()
        const found = artists.find(a => a.email === userLogin.email)

        if (found) {
            localStorage.setItem("currentUserId", String(found.id))
            setUserLogin({ email: "" })
            setCurrentUser(found.id)
            navigate(`/artists/${found.id}`)
        } else {
            window.alert("Not registered? Register below")
        }
    }

    return (
        <form
            className="mx-auto mt-[10rem] flex w-[20rem] flex-col items-center gap-10"
            action=""
            name="form"
        >
            <h1 className="text-[5rem] font-bold tracking-wider">Login</h1>
            <fieldset className="flex w-full flex-col items-start gap-2">
                <label htmlFor="email" className="self-center pl-1 text-xl">
                    Email:
                </label>
                <input
                    className="shadow-dark w-full rounded-2xl p-1 pl-2 shadow-sm"
                    type="email"
                    onChange={handleChange}
                    id="email"
                    value={userLogin.email}
                    placeholder="Email"
                />
            </fieldset>
            <fieldset className="flex w-full justify-around">
                <button
                    className="shadow-dark bg-blue-grey hover:bg-light-blue text-dark hover:text-light h-[3rem] w-[6rem] cursor-pointer rounded-2xl p-2 font-bold tracking-wider shadow-sm hover:scale-105"
                    onClick={handleLogin}
                >
                    Login
                </button>
                <button
                    className="shadow-dark bg-blue-grey hover:bg-light-blue text-dark hover:text-light h-[3rem] w-[6rem] cursor-pointer rounded-2xl font-bold tracking-wider shadow-sm hover:scale-105"
                    onClick={e => {
                        e.preventDefault()
                        navigate("/register")
                    }}
                >
                    Register
                </button>
            </fieldset>
        </form>
    )
}
