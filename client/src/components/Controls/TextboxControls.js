import React, { useContext } from "react"
import { Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core"

import { WorkspaceContext } from "../Workspace.js"
import { TYPES } from "../../Models/Textbox.js"

function TextboxControls({ data, id, onChange }) {
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={1}>
                <Typography variant="h5" align="center">{ id }</Typography>
            </Grid>

            <Grid item xs>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>

                    <Select
                        value={data.type}
                        onChange={event => onChange({
                            ...data,
                            type: event.target.value
                        })}
                    >
                        {Object.values(TYPES).map(type => (
                            <MenuItem value={type} key={type}>{type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs>
                { data.type === TYPES.TEXT ? (
                    <TextField
                        name="textContent"
                        label="Text"
                        value={data.data}
                        fullWidth
                        onChange={event => onChange({
                            ...data,
                            data: event.target.value
                        })}
                    />
                ) : null}
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