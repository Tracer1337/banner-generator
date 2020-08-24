import React, { useContext } from "react"
import { Grid, TextField, Switch, FormControlLabel } from "@material-ui/core"

import { WorkspaceContext } from "../Workspace.js"

function GridControls() {
    const context = useContext(WorkspaceContext)

    const handleChange = (values) => {
        context.set({
            grid: {
                ...context.grid,
                ...values
            }
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={context.grid.isEnabled}
                            onChange={event => handleChange({ isEnabled: event.target.checked })}
                        />
                    }
                    label="Enabled"
                />
            </Grid>
            
            <Grid item xs={6}>
                <TextField
                    value={context.grid.columns}
                    onChange={event => handleChange({ columns: event.target.value })}
                    label="Columns"
                    type="number"
                    fullWidth
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    value={context.grid.rows}
                    onChange={event => handleChange({ rows: event.target.value })}
                    name="rows"
                    label="Rows"
                    type="number"
                    fullWidth
                />
            </Grid>
        </Grid>
    )
}

export default GridControls