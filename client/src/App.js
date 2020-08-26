import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { CssBaseline, CircularProgress } from "@material-ui/core"

import Router from "./router/index.js"
import { getProfile } from "./config/api.js"
import { login } from "./store/actions.js"

function App() {
    const dispatch = useDispatch()

    const token = useSelector(store => store.auth.token)

    const [isLoading, setIsLoading] = useState(!!token)

    // Login at page load
    useEffect(() => {
        if (token) {
            getProfile()
                .then(res => dispatch(login({ token, user: res.data })))
                .finally(() => setIsLoading(false))
        }
    }, [])

    return (
        <div>
            <CssBaseline/>

            { isLoading ? <CircularProgress /> : <Router /> }
        </div>
    )
}

export default App