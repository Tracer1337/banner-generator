import React from "react"
import { AppBar, Toolbar, Typography } from "@material-ui/core"

function Header() {
    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6">Banner Generator</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header