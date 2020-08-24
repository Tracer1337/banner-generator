import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"

import Canvas from "./Canvas/Canvas.js"
import Controls from "./Controls/Controls.js"

const WorkspaceContext = React.createContext()

const useStyles = makeStyles(theme => ({
}))

function Workspace() {
    const classes = useStyles()

    const [context, setContext] = useState({
        event: new EventTarget(),
        image: null,
        textboxes: [],
        grid: {
            isEnabled: true,
            rows: 16,
            columns: 16
        }
    })

    const setter = {
        set: values => setContext({ ...context, ...values })
    }

    return (
        <WorkspaceContext.Provider value={{ ...context, ...setter }}>
            <Grid container spacing={8}>
                <Grid item xs>
                    <Canvas />
                </Grid>

                <Grid item xs>
                    <Controls />
                </Grid>
            </Grid>
        </WorkspaceContext.Provider>
    )
}

export { WorkspaceContext }

export default Workspace