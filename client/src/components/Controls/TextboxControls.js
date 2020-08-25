import React, { useContext } from "react"
import { Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel, IconButton } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"

import { WorkspaceContext } from "../Workspace.js"
import { TYPES } from "../../Models/Textbox.js"
import { COLORS } from "../../config/constants.js"

function TextboxControls({ textbox }) {
    const { data, key } = textbox
    
    const context = useContext(WorkspaceContext)

    const handleChange = (values) => {
        textbox.data = {
            ...data,
            ...values
        }

        context.reload()
    }

    const handleDelete = () => {
        const newTextboxes = context.model.textboxes.filter(({ key }) => textbox.key !== key)

        context.set({
            model: {
                ...context.model,
                textboxes: newTextboxes
            }
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={1}>
                <Typography variant="h5" align="center">{ key }</Typography>
            </Grid>

            <Grid item container xs={11} spacing={2}>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>

                        <Select
                            value={data.type}
                            onChange={event => handleChange({
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

                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel>Color</InputLabel>

                        <Select
                            value={data.typography.color}
                            onChange={event => handleChange({
                                ...data,
                                typography: {
                                    ...data.typography,
                                    color: event.target.value
                                }
                            })}
                        >
                            {Object.entries(COLORS).map(([key, value]) => (
                                <MenuItem value={value} key={key}>{key}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={2}>
                    <TextField
                        label="Width"
                        type="number"
                        inputProps={{ step: 10 }}
                        value={data.dimensions.width}
                        onChange={event => {
                            handleChange({
                                ...data,
                                dimensions: {
                                    ...data.dimensions,
                                    width: parseInt(event.target.value)
                                }
                            })
                        }}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={2}>
                    <TextField
                        label="Height"
                        type="number"
                        inputProps={{ step: 10 }}
                        value={data.dimensions.height}
                        onChange={event => {
                            handleChange({
                                ...data,
                                dimensions: {
                                    ...data.dimensions,
                                    height: parseInt(event.target.value)
                                }
                            })
                        }}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={2}>
                    <TextField
                        label="Font Size"
                        type="number"
                        value={data.typography.fontSize}
                        onChange={event => {
                            handleChange({
                                ...data,
                                typography: {
                                    ...data.typography,
                                    fontSize: parseInt(event.target.value)
                                }
                            })
                        }}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={1}>
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon/>
                    </IconButton>
                </Grid>

                <Grid item xs={12}>
                    {data.type === TYPES.TEXT ? (
                        <TextField
                            label="Text"
                            value={data.data}
                            onChange={event => handleChange({
                                ...data,
                                data: event.target.value
                            })}
                            fullWidth
                        />
                    ) : null}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TextboxControls