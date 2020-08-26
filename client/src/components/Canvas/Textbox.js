import React, { useState, useContext, useEffect } from "react"
import moment from "moment"
import { DraggableCore } from "react-draggable"
import { Badge } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { WorkspaceContext } from "../Workspace.js"
import { TYPES } from "../../Models/Textbox"

const useStyles = makeStyles(theme => ({
    textbox: {
        padding: theme.spacing(1),
        position: "absolute",
        top: 0, left: 0,
        cursor: "move",
        border: "1px solid",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}))

function Textbox({ textbox, imageDimensions }) {
    const context = useContext(WorkspaceContext)
    
    const classes = useStyles()

    const [position, setPosition] = useState(textbox.data.position)

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.grid])

    useEffect(() => {
        textbox.data.position = position

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position])

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
                badgeContent={textbox.key}
                color="primary"
                invisible={false}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    ...textbox.data.dimensions,
                    ...textbox.data.typography
                }}
            >
                { textbox.data.type === TYPES.TEXT ? (
                    textbox.data.data
                ) : textbox.data.type === TYPES.TIME ? (
                    moment().format("HH:mm").toString()
                ) : null }
            </Badge>
        </DraggableCore>
    )
}

export default Textbox