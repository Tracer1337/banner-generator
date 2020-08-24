import React, { useContext } from "react"
import { Button, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { WorkspaceContext } from "../Workspace.js"
import GridControls from "./GridControls.js"
import TextboxControls from "./TextboxControls.js"

const useStyles = makeStyles(theme => ({
    sectionTitle: {
        marginBottom: theme.spacing(1)
    }
}))

function Controls() {
    const context = useContext(WorkspaceContext)

    const classes = useStyles()

    const dispatch = (type) => () => context.event.dispatchEvent(new CustomEvent(type))

    return (
        <Grid container spacing={2}>
            <Grid item>
                <Button variant="contained" color="primary" onClick={dispatch("importImage")}>Import Image</Button>
            </Grid>

            { context.image && (
                <>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={dispatch("addTextbox")}>Add Textbox</Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h5" className={classes.sectionTitle}>Grid</Typography>
                        <GridControls />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h5" className={classes.sectionTitle}>Textboxes</Typography>
                        <TextboxControls />
                    </Grid>
                </>
            ) }
        </Grid>
    )
}

export default Controls