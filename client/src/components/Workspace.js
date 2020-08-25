import React, { useState, useReducer } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"

import Canvas from "./Canvas/Canvas.js"
import Controls from "./Controls/Controls.js"

const WorkspaceContext = React.createContext()

const useStyles = makeStyles(theme => ({
}))

function Workspace() {
    const classes = useStyles()

    const [reloadKey, reload] = useReducer(key => key + 1, 0)
    
    const [context, setContext] = useState({
        event: new EventTarget(),
        model: {
            image: null,
            textboxes: []
        },
        grid: {
            isEnabled: true,
            rows: 16,
            columns: 16
        }
    })

    const methods = {
        set: values => setContext({ ...context, ...values }),
        reload
    }

    window.context = context

    return (
        <WorkspaceContext.Provider value={{ ...context, ...methods }}>
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