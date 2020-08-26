import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import IndexPage from "../pages/IndexPage.js"
import LoginPage from "../pages/LoginPage.js"
import RegisterPage from "../pages/RegisterPage.js"
import ProfilePage from "../pages/ProfilePage.js"

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/profile">
                    <ProfilePage/>
                </Route>

                <Route path="/login">
                    <LoginPage/>
                </Route>

                <Route path="/register">
                    <RegisterPage/>
                </Route>

                <Route path="/">
                    <IndexPage/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router