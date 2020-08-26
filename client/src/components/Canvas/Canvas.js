import React, { useContext, useEffect, useRef } from "react"
import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { WorkspaceContext } from "../Workspace.js"
import TextboxElement from "./Textbox.js"
import Grid from "./Grid.js"
import { importFile, fileToImage } from "../../utils"
import Textbox from "../../Models/Textbox.js"

const useStyles = makeStyles(theme => ({
    canvas: {
        minHeight: 170,
        overflow: "hidden",
        position: "relative",
        userSelect: "none"
    },

    image: {
        width: "100%"
    }
}))

function Canvas() {
    const context = useContext(WorkspaceContext)

    const classes = useStyles()

    const imageRef = useRef()
    const idCounter = useRef(0)

    const handleImportImage = async () => {
        const file = await importFile("image/*")
        const base64Image = await fileToImage(file)

        context.set({
            model: {
                ...context.model,
                image: base64Image
            }
        })
    }

    const handleAddTextbox = () => {
        context.set({
            model: {
                ...context.model,
                textboxes: [
                    ...context.model.textboxes,
                    new Textbox(idCounter.current++)
                ]
            }
        })
    }

    useEffect(() => {
        context.event.addEventListener("importImage", handleImportImage)
        context.event.addEventListener("addTextbox", handleAddTextbox)
        
        return () => {
            context.event.removeEventListener("importImage", handleImportImage)
            context.event.removeEventListener("addTextbox", handleAddTextbox)
        }
    })

    return (
        <Paper className={classes.canvas}>
            { context.model.image && (
                <>
                    { context.grid.isEnabled && <Grid /> }

                    <img
                        src={context.model.image}
                        alt=""
                        className={classes.image}
                        ref={imageRef}
                        draggable="false"
                    />
                </>
            ) }

            { context.model.textboxes.map(textbox => (
                React.createElement(TextboxElement, {
                    textbox,
                    key: textbox.key,
                    imageDimensions: {
                        width: imageRef.current.clientWidth,
                        height: imageRef.current.clientHeight
                    }
                })
            )) }
        </Paper>
    )
}

export default Canvas