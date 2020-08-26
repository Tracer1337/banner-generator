import React from "react"
import { useSelector } from "react-redux"
import { Typography, Container } from "@material-ui/core"

import Layout from "../components/Layout/Layout.js"

function ProfilePage() {
    const user = useSelector(store => store.auth.user)

    return (
        <Layout spacingTop>
            <Container maxWidth="sm">
                <Typography paragraph>Email: {user.email}</Typography>
            </Container>
        </Layout>
    )
}

export default ProfilePage