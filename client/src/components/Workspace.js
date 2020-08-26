import React, { useState, useReducer, useEffect } from "react"
import { Grid } from "@material-ui/core"

import Canvas from "./Canvas/Canvas.js"
import Controls from "./Controls/Controls.js"

import { storeBanner } from "../config/api.js"

const WorkspaceContext = React.createContext()

function Workspace() {
    // eslint-disable-next-line no-unused-vars
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

    const handleUpload = () => {
        storeBanner(context.model)
            .then(res => console.log(res))
            .catch(error => console.error(error.response))
    }
    
    useEffect(() => {
        context.event.addEventListener("store", handleUpload)
        
        return () => {
            context.event.removeEventListener("store", handleUpload)
        }
    })
    
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