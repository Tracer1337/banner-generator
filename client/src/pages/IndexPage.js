import React from "react"
import { useSelector } from "react-redux"

import Layout from "../components/Layout/Layout.js"
import AuthAdvice from "../components/AuthAdvice.js"
import Workspace from "../components/Workspace.js"

function IndexPage() {
    const isLoggedIn = useSelector(store => store.auth.isLoggedIn)

    if (!isLoggedIn) {
        return (
            <Layout spacingTop>
                <AuthAdvice/>
            </Layout>
        )
    }
    
    return (
        <Layout spacingTop>
            <Workspace/>
        </Layout>
    )
}

export default IndexPage