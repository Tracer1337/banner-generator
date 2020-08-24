import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout.js"
import Workspace from "../components/Workspace.js"

const useStyles = makeStyles(theme => ({
    index: {
        marginTop: 200
    }
}))

function IndexPage() {
    const classes = useStyles()
    
    return (
        <Layout className={classes.index}>
            <Workspace/>
        </Layout>
    )
}

export default IndexPage