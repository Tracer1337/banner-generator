import React, { useEffect, useRef, useContext } from "react"
import { makeStyles } from "@material-ui/core"

import { WorkspaceContext } from "../Workspace.js"

function line(context, x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
}

const useStyles = makeStyles(theme => ({
    canvas: {
        position: "absolute",
        pointerEvents: "none",
        touchAction: "none",
        width: "100%",
        height: "100%"
    }
}))

function Grid() {
    const classes = useStyles()

    const context = useContext(WorkspaceContext)

    const canvas = useRef()

    const setDimensions = () => {
        const canvasRect = canvas.current.getBoundingClientRect()

        canvas.current.width = canvasRect.width
        canvas.current.height = canvasRect.height
    }

    const renderGrid = () => {
        const renderContext = canvas.current.getContext("2d")

        renderContext.strokeStyle = "#000000"

        // Calculate cell size
        const cellWidth = canvas.current.clientWidth / context.grid.columns
        const cellHeight = canvas.current.clientHeight / context.grid.rows

        // Render vertical lines
        for (let x = 0; x < canvas.current.width; x += cellWidth) {
            line(renderContext, x, 0, x, canvas.current.height)
        }

        // Render horizontal lines
        for (let y = 0; y < canvas.current.height; y += cellHeight) {
            line(renderContext, 0, y, canvas.current.width, y)
        }
    }

    useEffect(() => {
        setDimensions()
        renderGrid()
    }, [context.image, context.grid])

    return (
        <canvas
            ref={canvas}
            className={classes.canvas}
        />
    )
}

export default Grid