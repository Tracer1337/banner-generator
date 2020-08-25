import React, { useState, useContext, useEffect } from "react"
import moment from "moment"
import { DraggableCore } from "react-draggable"
import { Badge } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { WorkspaceContext } from "../Workspace.js"
import { TYPES } from "../../Models/Textbox"

const useStyles = makeStyles(theme => ({
    textbox: {
        width: 100,
        height: 50,
        padding: theme.spacing(1),
        position: "absolute",
        top: 0, left: 0,
        cursor: "move",
        border: "1px solid"
    }
}))

function Textbox({ data, imageDimensions, id }) {
    const context = useContext(WorkspaceContext)
    
    const classes = useStyles()

    const [position, setPosition] = useState({ x: 0, y: 0 })
    
    const handleDrag = (event, pos) => {
        setPosition({
            x: position.x + pos.deltaX,
            y: position.y + pos.deltaY
        })
    }

    /**
     * Snap to grid
     */
    useEffect(() => {
        const cellWidth = imageDimensions.width / context.grid.columns
        const cellHeight = imageDimensions.height / context.grid.rows

        if (cellWidth && cellHeight) {
            setPosition({
                x: Math.round(position.x / cellWidth) * cellWidth,
                y: Math.round(position.y / cellHeight) * cellHeight
            })
        }
    }, [context.grid])

    const grid = [
        imageDimensions.width / context.grid.columns,
        imageDimensions.height / context.grid.rows
    ]

    return (
        <DraggableCore
            onDrag={handleDrag}
            grid={context.grid.isEnabled ? grid : null}
        >
            <Badge
                className={classes.textbox}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`
                }}

                badgeContent={id}
                color="primary"
                invisible={false}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
            >
                { data.type === TYPES.TEXT ? (
                    data.data
                ) : data.type === TYPES.TIME ? (
                    moment().format("HH:mm").toString()
                ) : null }
            </Badge>
        </DraggableCore>
    )
}

export default Textbox