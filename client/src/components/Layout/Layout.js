import React from "react"
import clsx from "clsx"
import { Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Header from "./Header.js"

const useStyles = makeStyles(theme => ({
    layout: {
        marginTop: theme.mixins.toolbar[theme.breakpoints.up("sm")].minHeight
    }
}))

function Layout({ children, className }) {
    const classes = useStyles()

    return (
        <Container className={clsx(classes.layout, className)}>
            <Header/>

            { children }
        </Container>
    )
}

export default Layout