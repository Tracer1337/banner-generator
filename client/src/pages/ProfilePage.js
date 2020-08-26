import React from "react"
import moment from "moment"
import { useSelector } from "react-redux"
import { Typography, Container, Grid } from "@material-ui/core"

import Layout from "../components/Layout/Layout.js"

function ProfilePage() {
    const user = useSelector(store => store.auth.user)

    return (
        <Layout spacingTop>
            <Container maxWidth="sm">
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography>Email:</Typography>
                    </Grid>

                    <Grid item xs={9}>
                        <Typography>{ user.email }</Typography>
                    </Grid>

                    <Grid item xs={3}>
                        <Typography>Member since:</Typography>
                    </Grid>

                    <Grid item xs={9}>
                        <Typography>{ moment(user.created_at).format("DD.MM.YYYY HH:mm").toString() }</Typography>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default ProfilePage