import React, { useContext } from "react"
import { Grid, TextField, Typography } from "@material-ui/core"

import { WorkspaceContext } from "../Workspace.js"

function TextboxControls({ data, id, onChange }) {
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={1}>
                <Typography variant="h5" align="center">{ id }</Typography>
            </Grid>

            <Grid item xs>
                <TextField
                    name="textContent"
                    label="Text"
                    value={data.textContent}
                    onChange={event => onChange({ textContent: event.target.value })}
                />
            </Grid>
        </Grid>
    )
}

function TextboxControlsList() {
    const context = useContext(WorkspaceContext)
    
    const handleChange = (textbox, values) => {
        context.textboxes.forEach(({ data, key }) => {
            if (key === textbox.key) {
                textbox.data = { ...data, ...values }
            }
        })

        context.set({
            textboxes: context.textboxes
        })
    }

    return context.textboxes.map(textbox => (
        <TextboxControls
            data={textbox.data}
            id={textbox.key}
            key={textbox.key}
            onChange={values => handleChange(textbox, values)}
        />
    ))
}

export default TextboxControlsList