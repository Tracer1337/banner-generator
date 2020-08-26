import React from "react"
import clsx from "clsx"
import { Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Header from "./Header.js"

const useStyles = makeStyles(theme => ({
    layout: {
        marginTop: theme.mixins.toolbar[theme.breakpoints.up("sm")].minHeight,
        paddingTop: props => props.spacingTop ? 200 : 0
    }
}))

function Layout({ spacingTop, className, children }) {
    const classes = useStyles({ spacingTop })

    return (
        <Container className={clsx(classes.layout, className)}>
            <Header/>

            { children }
        </Container>
    )
}

export default Layout