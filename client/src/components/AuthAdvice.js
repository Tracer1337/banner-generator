import React from "react"
import { Link } from "react-router-dom"
import { Button, Grid } from "@material-ui/core"

function AuthAdvice() {
    return (
        <Grid container justify="center" spacing={4}>
            <Grid item>
                <Link to="/login">
                    <Button variant="contained" color="primary">Login</Button>
                </Link>
            </Grid>

            <Grid item>
                <Link to="/register">
                    <Button variant="contained" color="primary">Register</Button>
                </Link>
            </Grid>
        </Grid>
    )
}

export default AuthAdvice